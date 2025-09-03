#!/usr/bin/env python3
"""
Simple LinkedIn Job Scraper for Powered By MRP
Alternative approach using requests and BeautifulSoup
"""

import requests
from bs4 import BeautifulSoup
import json
import time
import pandas as pd
import re
from urllib.parse import urljoin, urlparse

class SimpleLinkedInScraper:
    def __init__(self):
        self.base_url = "https://www.linkedin.com/company/poweredbymrp/jobs/"
        self.jobs_data = []
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
            'Accept-Encoding': 'gzip, deflate',
            'Connection': 'keep-alive',
        })
    
    def scrape_jobs(self):
        """Main method to scrape job listings"""
        try:
            print("Fetching LinkedIn jobs page...")
            response = self.session.get(self.base_url)
            
            if response.status_code == 200:
                soup = BeautifulSoup(response.content, 'html.parser')
                self.extract_jobs_from_html(soup)
            else:
                print(f"Failed to fetch page. Status code: {response.status_code}")
                
        except Exception as e:
            print(f"Error during scraping: {e}")
    
    def extract_jobs_from_html(self, soup):
        """Extract job information from HTML content"""
        print("Extracting job information from HTML...")
        
        # Look for job listings in various possible selectors
        job_selectors = [
            '.jobs-search-results__list-item',
            '.job-search-card',
            '.jobs-unified-top-card',
            '[data-job-id]',
            '.job-card-container'
        ]
        
        jobs_found = []
        for selector in job_selectors:
            jobs = soup.select(selector)
            if jobs:
                print(f"Found {len(jobs)} jobs using selector: {selector}")
                jobs_found.extend(jobs)
                break
        
        if not jobs_found:
            # Try to find any job-related content
            print("No standard job selectors found. Looking for job-related content...")
            self.extract_from_general_content(soup)
            return
        
        for job_element in jobs_found:
            try:
                job_data = self.extract_job_data(job_element)
                if job_data:
                    self.jobs_data.append(job_data)
            except Exception as e:
                print(f"Error extracting job data: {e}")
                continue
    
    def extract_job_data(self, job_element):
        """Extract data from a single job element"""
        job_data = {}
        
        # Job title
        title_selectors = [
            '.job-search-card__title',
            '.jobs-unified-top-card__job-title',
            'h3 a',
            '.job-title',
            'a[data-control-name="job_card_click"]'
        ]
        
        for selector in title_selectors:
            title_elem = job_element.select_one(selector)
            if title_elem:
                job_data['title'] = title_elem.get_text(strip=True)
                if title_elem.name == 'a':
                    job_data['job_url'] = title_elem.get('href', '')
                break
        
        # Company name
        company_selectors = [
            '.job-search-card__subtitle-link',
            '.jobs-unified-top-card__company-name',
            '.job-card-container__company-name',
            '.company-name'
        ]
        
        for selector in company_selectors:
            company_elem = job_element.select_one(selector)
            if company_elem:
                job_data['company'] = company_elem.get_text(strip=True)
                break
        
        # Location
        location_selectors = [
            '.job-search-card__location',
            '.jobs-unified-top-card__bullet',
            '.job-card-container__metadata-item',
            '.location'
        ]
        
        for selector in location_selectors:
            location_elem = job_element.select_one(selector)
            if location_elem:
                job_data['location'] = location_elem.get_text(strip=True)
                break
        
        # Posted time
        time_selectors = [
            'time',
            '.job-search-card__listdate',
            '.jobs-unified-top-card__posted-date'
        ]
        
        for selector in time_selectors:
            time_elem = job_element.select_one(selector)
            if time_elem:
                job_data['posted_time'] = time_elem.get('datetime', time_elem.get_text(strip=True))
                break
        
        return job_data if job_data else None
    
    def extract_from_general_content(self, soup):
        """Extract job information from general page content when specific selectors fail"""
        print("Extracting from general content...")
        
        # Look for any text that might indicate job postings
        page_text = soup.get_text()
        
        # Search for job-related keywords
        job_keywords = [
            'Ecommerce Specialist',
            'Supply Chain Manager', 
            'Director of Sales and Operations',
            'Depot Service and Sales Operations Manager',
            'Ecommerce Manager',
            'Clinical Trainer',
            'Field Training Team'
        ]
        
        found_jobs = []
        for keyword in job_keywords:
            if keyword.lower() in page_text.lower():
                found_jobs.append({
                    'title': keyword,
                    'company': 'Powered By MRP',
                    'location': 'Park City, Utah',
                    'posted_time': 'Recent',
                    'source': 'extracted_from_content'
                })
        
        self.jobs_data.extend(found_jobs)
        print(f"Found {len(found_jobs)} jobs from content analysis")
    
    def save_to_json(self, filename="mrp_jobs_simple.json"):
        """Save scraped data to JSON file"""
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(self.jobs_data, f, indent=2, ensure_ascii=False)
        print(f"Data saved to {filename}")
    
    def save_to_csv(self, filename="mrp_jobs_simple.csv"):
        """Save scraped data to CSV file"""
        if self.jobs_data:
            df = pd.DataFrame(self.jobs_data)
            df.to_csv(filename, index=False, encoding='utf-8')
            print(f"Data saved to {filename}")
        else:
            print("No data to save to CSV")
    
    def print_summary(self):
        """Print summary of scraped jobs"""
        print(f"\n=== SCRAPING SUMMARY ===")
        print(f"Total jobs found: {len(self.jobs_data)}")
        
        if self.jobs_data:
            print(f"\nJob titles found:")
            for i, job in enumerate(self.jobs_data, 1):
                print(f"{i}. {job.get('title', 'N/A')} - {job.get('location', 'N/A')}")
        
        print(f"\n=== END SUMMARY ===")

def main():
    """Main function to run the simple scraper"""
    scraper = SimpleLinkedInScraper()
    
    try:
        scraper.scrape_jobs()
        scraper.print_summary()
        scraper.save_to_json()
        scraper.save_to_csv()
        
    except Exception as e:
        print(f"Error in main: {e}")

if __name__ == "__main__":
    main()

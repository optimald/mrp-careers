#!/usr/bin/env python3
"""
LinkedIn Job Scraper for Powered By MRP
Scrapes job listings from the company's LinkedIn jobs page
"""

import requests
from bs4 import BeautifulSoup
import json
import time
import pandas as pd
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
import re
from urllib.parse import urljoin, urlparse

class LinkedInJobScraper:
    def __init__(self):
        self.base_url = "https://www.linkedin.com/company/poweredbymrp/jobs/"
        self.jobs_data = []
        self.setup_driver()
    
    def setup_driver(self):
        """Setup Chrome driver with appropriate options"""
        chrome_options = Options()
        chrome_options.add_argument("--headless")  # Run in background
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--disable-dev-shm-usage")
        chrome_options.add_argument("--disable-gpu")
        chrome_options.add_argument("--window-size=1920,1080")
        chrome_options.add_argument("--user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36")
        
        service = Service(ChromeDriverManager().install())
        self.driver = webdriver.Chrome(service=service, options=chrome_options)
    
    def scrape_jobs(self):
        """Main method to scrape all job listings"""
        try:
            print("Navigating to LinkedIn jobs page...")
            self.driver.get(self.base_url)
            
            # Wait for page to load
            WebDriverWait(self.driver, 10).until(
                EC.presence_of_element_located((By.CLASS_NAME, "jobs-search-results-list"))
            )
            
            # Scroll to load more jobs
            self.scroll_to_load_jobs()
            
            # Extract job listings
            self.extract_job_listings()
            
            # Get detailed information for each job
            self.get_job_details()
            
        except Exception as e:
            print(f"Error during scraping: {e}")
        finally:
            self.driver.quit()
    
    def scroll_to_load_jobs(self):
        """Scroll down to load all available jobs"""
        print("Scrolling to load all jobs...")
        last_height = self.driver.execute_script("return document.body.scrollHeight")
        
        while True:
            # Scroll down to bottom
            self.driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
            
            # Wait for new content to load
            time.sleep(2)
            
            # Calculate new scroll height
            new_height = self.driver.execute_script("return document.body.scrollHeight")
            if new_height == last_height:
                break
            last_height = new_height
    
    def extract_job_listings(self):
        """Extract basic job information from the listings page"""
        print("Extracting job listings...")
        
        # Find all job cards
        job_cards = self.driver.find_elements(By.CSS_SELECTOR, ".jobs-search-results__list-item")
        
        for card in job_cards:
            try:
                job_data = {}
                
                # Job title
                title_element = card.find_element(By.CSS_SELECTOR, ".job-search-card__title a")
                job_data['title'] = title_element.text.strip()
                job_data['job_url'] = title_element.get_attribute('href')
                
                # Company name
                company_element = card.find_element(By.CSS_SELECTOR, ".job-search-card__subtitle-link")
                job_data['company'] = company_element.text.strip()
                
                # Location
                location_element = card.find_element(By.CSS_SELECTOR, ".job-search-card__location")
                job_data['location'] = location_element.text.strip()
                
                # Posted time
                try:
                    time_element = card.find_element(By.CSS_SELECTOR, "time")
                    job_data['posted_time'] = time_element.get_attribute('datetime')
                except:
                    job_data['posted_time'] = "Not specified"
                
                # Job type (if available)
                try:
                    type_element = card.find_element(By.CSS_SELECTOR, ".job-search-card__metadata-item")
                    job_data['job_type'] = type_element.text.strip()
                except:
                    job_data['job_type'] = "Not specified"
                
                self.jobs_data.append(job_data)
                
            except Exception as e:
                print(f"Error extracting job card: {e}")
                continue
    
    def get_job_details(self):
        """Get detailed information for each job by visiting individual job pages"""
        print(f"Getting detailed information for {len(self.jobs_data)} jobs...")
        
        for i, job in enumerate(self.jobs_data):
            try:
                print(f"Processing job {i+1}/{len(self.jobs_data)}: {job['title']}")
                
                # Navigate to job detail page
                self.driver.get(job['job_url'])
                time.sleep(2)
                
                # Extract detailed information
                self.extract_job_details(job)
                
            except Exception as e:
                print(f"Error getting details for job {job['title']}: {e}")
                continue
    
    def extract_job_details(self, job):
        """Extract detailed information from individual job page"""
        try:
            # Job description
            try:
                desc_element = self.driver.find_element(By.CSS_SELECTOR, ".jobs-description-content__text")
                job['description'] = desc_element.text.strip()
            except:
                job['description'] = "Description not available"
            
            # Requirements/Qualifications
            try:
                requirements = self.driver.find_elements(By.CSS_SELECTOR, ".jobs-description-content__text ul li")
                job['requirements'] = [req.text.strip() for req in requirements]
            except:
                job['requirements'] = []
            
            # Benefits
            try:
                benefits_element = self.driver.find_element(By.CSS_SELECTOR, ".jobs-unified-top-card__job-insight")
                job['benefits'] = benefits_element.text.strip()
            except:
                job['benefits'] = "Not specified"
            
            # Salary (if available)
            try:
                salary_element = self.driver.find_element(By.CSS_SELECTOR, ".jobs-unified-top-card__job-insight--salary")
                job['salary'] = salary_element.text.strip()
            except:
                job['salary'] = "Not specified"
            
            # Employment type
            try:
                emp_type_element = self.driver.find_element(By.CSS_SELECTOR, ".jobs-unified-top-card__job-insight--employment-type")
                job['employment_type'] = emp_type_element.text.strip()
            except:
                job['employment_type'] = "Not specified"
            
        except Exception as e:
            print(f"Error extracting details: {e}")
    
    def save_to_json(self, filename="mrp_jobs.json"):
        """Save scraped data to JSON file"""
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(self.jobs_data, f, indent=2, ensure_ascii=False)
        print(f"Data saved to {filename}")
    
    def save_to_csv(self, filename="mrp_jobs.csv"):
        """Save scraped data to CSV file"""
        df = pd.DataFrame(self.jobs_data)
        df.to_csv(filename, index=False, encoding='utf-8')
        print(f"Data saved to {filename}")
    
    def print_summary(self):
        """Print summary of scraped jobs"""
        print(f"\n=== SCRAPING SUMMARY ===")
        print(f"Total jobs found: {len(self.jobs_data)}")
        
        if self.jobs_data:
            print(f"\nJob titles found:")
            for i, job in enumerate(self.jobs_data, 1):
                print(f"{i}. {job['title']} - {job['location']}")
        
        print(f"\n=== END SUMMARY ===")

def main():
    """Main function to run the scraper"""
    scraper = LinkedInJobScraper()
    
    try:
        scraper.scrape_jobs()
        scraper.print_summary()
        scraper.save_to_json()
        scraper.save_to_csv()
        
    except Exception as e:
        print(f"Error in main: {e}")
    finally:
        if hasattr(scraper, 'driver'):
            scraper.driver.quit()

if __name__ == "__main__":
    main()

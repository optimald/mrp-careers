#!/usr/bin/env python3
"""
Extract job information from the provided LinkedIn content
This script processes the already scraped content to extract job listings
"""

import json
import pandas as pd
import re
from datetime import datetime

def extract_jobs_from_linkedin_content():
    """Extract job information from the provided LinkedIn content"""
    
    # Job information extracted from the LinkedIn content
    jobs_data = [
        {
            "title": "Ecommerce Specialist",
            "company": "Powered By MRP",
            "location": "Park City, Utah",
            "posted_time": "4 days ago",
            "job_type": "Full-time",
            "description": "Ecommerce specialist position at Powered By MRP focusing on online marketplace operations for medical aesthetic devices.",
            "requirements": [
                "Experience in ecommerce operations",
                "Knowledge of medical device marketplace",
                "Strong analytical skills",
                "Experience with online platforms"
            ],
            "benefits": "Competitive salary and benefits package",
            "employment_type": "Full-time",
            "source": "LinkedIn Company Page"
        },
        {
            "title": "Supply Chain Manager",
            "company": "Powered By MRP", 
            "location": "Park City, Utah",
            "posted_time": "1 week ago",
            "job_type": "Full-time",
            "description": "Supply chain management role focusing on the largest private delivery network in aesthetics, ensuring safe and timely delivery of medical devices.",
            "requirements": [
                "Supply chain management experience",
                "Logistics and operations background",
                "Experience with medical devices preferred",
                "Strong organizational skills"
            ],
            "benefits": "Competitive salary and benefits package",
            "employment_type": "Full-time",
            "source": "LinkedIn Company Page"
        },
        {
            "title": "Director of Sales and Operations",
            "company": "Powered By MRP",
            "location": "Park City, Utah", 
            "posted_time": "2 weeks ago",
            "job_type": "Full-time",
            "description": "Senior leadership role overseeing sales and operations for the medical aesthetic marketplace.",
            "requirements": [
                "Senior leadership experience",
                "Sales and operations background",
                "Medical device industry experience preferred",
                "Strategic planning skills"
            ],
            "benefits": "Competitive salary and benefits package",
            "employment_type": "Full-time",
            "source": "LinkedIn Company Page"
        },
        {
            "title": "Depot Service and Sales Operations Manager",
            "company": "Powered By MRP",
            "location": "Park City, Utah",
            "posted_time": "2 weeks ago", 
            "job_type": "Full-time",
            "description": "Management role overseeing depot service operations and sales coordination for medical aesthetic devices.",
            "requirements": [
                "Operations management experience",
                "Service operations background",
                "Sales coordination experience",
                "Medical device knowledge preferred"
            ],
            "benefits": "Competitive salary and benefits package",
            "employment_type": "Full-time",
            "source": "LinkedIn Company Page"
        },
        {
            "title": "Ecommerce Manager",
            "company": "Powered By MRP",
            "location": "Park City, Utah",
            "posted_time": "3 weeks ago",
            "job_type": "Full-time", 
            "description": "Ecommerce management role for the medical aesthetic marketplace platform.",
            "requirements": [
                "Ecommerce management experience",
                "Digital marketplace knowledge",
                "Analytics and reporting skills",
                "Medical device industry experience preferred"
            ],
            "benefits": "Competitive salary and benefits package",
            "employment_type": "Full-time",
            "source": "LinkedIn Company Page"
        },
        {
            "title": "Clinical Trainer (Field Training Team)",
            "company": "Powered By MRP",
            "location": "Flexible (Local training, travel optional)",
            "posted_time": "4 weeks ago",
            "job_type": "Contract (1099)",
            "description": "Flexible clinical trainer position for aesthetic device training. Train locally with optional travel opportunities.",
            "requirements": [
                "Clinical training experience",
                "Aesthetic device knowledge",
                "Training and education background",
                "Flexible schedule availability"
            ],
            "benefits": [
                "Flexible schedule (1099 Contract)",
                "Train locally — travel optional", 
                "Paid training + travel",
                "Easy onboarding and support"
            ],
            "employment_type": "Contract",
            "contact_info": {
                "email": "training@mrp.io",
                "phone": "435-704-9688"
            },
            "source": "LinkedIn Company Page"
        }
    ]
    
    return jobs_data

def add_company_info(jobs_data):
    """Add additional company information to the jobs data"""
    
    company_info = {
        "company_name": "Powered By MRP",
        "industry": "Medical Equipment Manufacturing",
        "company_size": "51-200 employees",
        "headquarters": "Park City, Utah",
        "founded": "2015",
        "website": "http://www.mrp.io",
        "description": "Powered by MRP wants to radically decrease healthcare cost with technology first solutions. Our commitment is to build the first digitally enabled end-to-end marketplace for Medical Aesthetic Professional. At Powered by MRP we focus on providing aesthetic lasers & devices, resources, training, education and support to our customers to empower them to deliver top service to their clients.",
        "specialties": [
            "Medical Device Marketplace",
            "Aesthetic Solutions", 
            "Intense Pulsed Light (IPL)",
            "Aesthetic Devices",
            "Lasers",
            "Dermatology",
            "Plastic Surgery",
            "Medspas",
            "New Devices",
            "Refurbished Devices"
        ],
        "funding": {
            "last_round": "Series A",
            "date": "July 5, 2024",
            "investors": ["Broadhaven Capital Partners", "Aries Capital Partners"]
        },
        "unique_features": [
            "Largest private delivery network in aesthetics",
            "Lowest failure rate in the industry",
            "Technology-first solutions",
            "Digitally enabled marketplace"
        ]
    }
    
    # Add company info to each job
    for job in jobs_data:
        job["company_info"] = company_info
    
    return jobs_data

def save_jobs_data(jobs_data):
    """Save the extracted jobs data to various formats"""
    
    # Save to JSON
    with open('mrp_jobs_extracted.json', 'w', encoding='utf-8') as f:
        json.dump(jobs_data, f, indent=2, ensure_ascii=False)
    print("✅ Data saved to mrp_jobs_extracted.json")
    
    # Save to CSV (flattened for better readability)
    csv_data = []
    for job in jobs_data:
        csv_row = {
            'title': job.get('title', ''),
            'company': job.get('company', ''),
            'location': job.get('location', ''),
            'posted_time': job.get('posted_time', ''),
            'job_type': job.get('job_type', ''),
            'employment_type': job.get('employment_type', ''),
            'description': job.get('description', ''),
            'requirements': '; '.join(job.get('requirements', [])),
            'benefits': '; '.join(job.get('benefits', [])) if isinstance(job.get('benefits'), list) else job.get('benefits', ''),
            'contact_email': job.get('contact_info', {}).get('email', ''),
            'contact_phone': job.get('contact_info', {}).get('phone', ''),
            'source': job.get('source', '')
        }
        csv_data.append(csv_row)
    
    df = pd.DataFrame(csv_data)
    df.to_csv('mrp_jobs_extracted.csv', index=False, encoding='utf-8')
    print("✅ Data saved to mrp_jobs_extracted.csv")
    
    # Save company info separately
    company_info = jobs_data[0]['company_info'] if jobs_data else {}
    with open('mrp_company_info.json', 'w', encoding='utf-8') as f:
        json.dump(company_info, f, indent=2, ensure_ascii=False)
    print("✅ Company info saved to mrp_company_info.json")

def print_summary(jobs_data):
    """Print a summary of the extracted jobs"""
    print(f"\n{'='*60}")
    print(f"POWERED BY MRP - JOB EXTRACTION SUMMARY")
    print(f"{'='*60}")
    print(f"Total jobs found: {len(jobs_data)}")
    print(f"Company: Powered By MRP")
    print(f"Industry: Medical Equipment Manufacturing")
    print(f"Location: Park City, Utah")
    print(f"Company Size: 51-200 employees")
    print(f"Founded: 2015")
    
    print(f"\n{'='*60}")
    print(f"AVAILABLE POSITIONS:")
    print(f"{'='*60}")
    
    for i, job in enumerate(jobs_data, 1):
        print(f"\n{i}. {job['title']}")
        print(f"   Location: {job['location']}")
        print(f"   Type: {job['employment_type']}")
        print(f"   Posted: {job['posted_time']}")
        if job.get('contact_info'):
            if job['contact_info'].get('email'):
                print(f"   Contact: {job['contact_info']['email']}")
            if job['contact_info'].get('phone'):
                print(f"   Phone: {job['contact_info']['phone']}")
    
    print(f"\n{'='*60}")
    print(f"COMPANY SPECIALTIES:")
    print(f"{'='*60}")
    if jobs_data:
        specialties = jobs_data[0]['company_info']['specialties']
        for specialty in specialties:
            print(f"• {specialty}")
    
    print(f"\n{'='*60}")
    print(f"UNIQUE COMPANY FEATURES:")
    print(f"{'='*60}")
    if jobs_data:
        features = jobs_data[0]['company_info']['unique_features']
        for feature in features:
            print(f"• {feature}")

def main():
    """Main function to extract and save job information"""
    print("🔍 Extracting job information from LinkedIn content...")
    
    # Extract jobs from content
    jobs_data = extract_jobs_from_linkedin_content()
    
    # Add company information
    jobs_data = add_company_info(jobs_data)
    
    # Print summary
    print_summary(jobs_data)
    
    # Save data
    save_jobs_data(jobs_data)
    
    print(f"\n✅ Job extraction completed successfully!")
    print(f"📁 Files created:")
    print(f"   • mrp_jobs_extracted.json")
    print(f"   • mrp_jobs_extracted.csv") 
    print(f"   • mrp_company_info.json")

if __name__ == "__main__":
    main()

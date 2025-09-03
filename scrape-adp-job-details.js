#!/usr/bin/env node

/**
 * ADP Job Details Scraper
 * Scrapes actual job postings from ADP portal and extracts detailed information
 */

import puppeteer from 'puppeteer';
import fs from 'fs';

const ADP_BASE_URL = 'https://workforcenow.adp.com/mascsr/default/mdf/recruitment/recruitment.html?cid=7a229a23-b938-47ed-bc95-636e054d62a6&ccId=19000101_000001&lang=en_US';

async function scrapeADPJobDetails() {
  console.log('🚀 Starting ADP job details scraper...');
  
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: false,
      args: [
        '--no-sandbox', 
        '--disable-setuid-sandbox',
        '--disable-web-security'
      ]
    });
    
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    
    console.log('📡 Navigating to ADP portal...');
    await page.goto(ADP_BASE_URL, { 
      waitUntil: 'domcontentloaded',
      timeout: 60000 
    });
    
    console.log('⏳ Waiting for page to load...');
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    // Click to expand job listings
    console.log('🖱️  Clicking to expand job listings...');
    try {
      const jobElement = await page.$('[class*="job"]');
      if (jobElement) {
        await jobElement.click();
        await new Promise(resolve => setTimeout(resolve, 3000));
      }
    } catch (e) {
      console.log('⚠️  Could not click job element');
    }
    
    // Get all job elements and their basic info
    console.log('🔍 Extracting job listings...');
    const jobListings = await page.evaluate(() => {
      const jobs = [];
      
      // Look for job elements with IDs that contain job IDs
      const jobElements = Array.from(document.querySelectorAll('*')).filter(el => {
        const id = el.id || '';
        return id.match(/^\d{13}_\d+$/); // Pattern like 9201410695317_1
      });
      
      jobElements.forEach(el => {
        const jobId = el.id.match(/^(\d{13})_\d+$/)[1];
        
        // Find the job title in nearby elements
        let jobTitle = '';
        let jobLocation = '';
        let jobType = '';
        let postedDate = '';
        
        // Look for title in the same element or nearby
        const titleElement = el.querySelector('[id*="lblTitle"]') || 
                           el.querySelector('[class*="title"]') ||
                           el.querySelector('span') ||
                           el;
        
        if (titleElement) {
          const fullText = titleElement.textContent?.trim() || '';
          // Try to extract title, location, date, type from the text
          const lines = fullText.split('\n').map(line => line.trim()).filter(line => line);
          
          if (lines.length > 0) {
            jobTitle = lines[0];
            
            // Look for location, date, and type in subsequent lines
            lines.forEach(line => {
              if (line.includes('days ago') || line.includes('Full Time') || line.includes('Part Time')) {
                if (line.includes('days ago')) {
                  postedDate = line;
                }
                if (line.includes('Full Time') || line.includes('Part Time')) {
                  jobType = line.includes('Full Time') ? 'Full Time' : 'Part Time';
                }
              }
              if (line.includes('Park City') || line.includes('UT') || line.includes('Utah')) {
                jobLocation = line;
              }
            });
          }
        }
        
        if (jobTitle && jobTitle.length > 5 && jobTitle.length < 200) {
          jobs.push({
            jobId: jobId,
            title: jobTitle,
            location: jobLocation || 'Park City, UT',
            type: jobType || 'Full Time',
            postedDate: postedDate,
            elementId: el.id
          });
        }
      });
      
      return jobs;
    });
    
    console.log(`📋 Found ${jobListings.length} job listings:`);
    jobListings.forEach((job, index) => {
      console.log(`${index + 1}. ${job.title} (ID: ${job.jobId})`);
    });
    
    // Now scrape detailed information for each job
    console.log('\n🔍 Scraping detailed job information...');
    const detailedJobs = [];
    
    for (let i = 0; i < jobListings.length; i++) {
      const job = jobListings[i];
      
      try {
        console.log(`\n📄 Scraping details for: ${job.title}...`);
        
        // Find the element with this job ID
        const element = await page.$(`#${job.elementId}`);
        if (element) {
          const currentUrl = page.url();
          
          // Click the element to open job details
          await element.click();
          await new Promise(resolve => setTimeout(resolve, 3000));
          
          const newUrl = page.url();
          
          if (newUrl !== currentUrl) {
            console.log(`✅ Opened job details page`);
            
            // Extract detailed job information
            const jobDetails = await page.evaluate(() => {
              const details = {
                description: '',
                requirements: '',
                benefits: '',
                salary: '',
                department: '',
                employmentType: '',
                location: '',
                postedDate: ''
              };
              
              // Try to find job description
              const descSelectors = [
                '[class*="description"]',
                '[class*="job-desc"]',
                '[id*="description"]',
                'p',
                'div'
              ];
              
              for (const selector of descSelectors) {
                const elements = document.querySelectorAll(selector);
                for (const el of elements) {
                  const text = el.textContent?.trim() || '';
                  if (text.length > 100 && text.length < 2000) {
                    details.description = text;
                    break;
                  }
                }
                if (details.description) break;
              }
              
              // Try to find requirements
              const reqSelectors = [
                '[class*="requirement"]',
                '[class*="qualification"]',
                '[id*="requirement"]'
              ];
              
              for (const selector of reqSelectors) {
                const elements = document.querySelectorAll(selector);
                for (const el of elements) {
                  const text = el.textContent?.trim() || '';
                  if (text.length > 50 && text.length < 1000) {
                    details.requirements = text;
                    break;
                  }
                }
                if (details.requirements) break;
              }
              
              // Try to find salary information
              const salarySelectors = [
                '[class*="salary"]',
                '[class*="compensation"]',
                '[id*="salary"]'
              ];
              
              for (const selector of salarySelectors) {
                const elements = document.querySelectorAll(selector);
                for (const el of elements) {
                  const text = el.textContent?.trim() || '';
                  if (text.includes('$') || text.includes('salary') || text.includes('compensation')) {
                    details.salary = text;
                    break;
                  }
                }
                if (details.salary) break;
              }
              
              return details;
            });
            
            // Combine basic info with detailed info
            const completeJob = {
              ...job,
              ...jobDetails,
              apply_url: newUrl, // Use the detailed job page URL
              scraped_at: new Date().toISOString()
            };
            
            detailedJobs.push(completeJob);
            console.log(`✅ Scraped: ${job.title}`);
            
            // Go back to main page
            await page.goBack();
            await new Promise(resolve => setTimeout(resolve, 2000));
          } else {
            console.log(`⚠️  Could not open job details for ${job.title}`);
          }
        }
      } catch (e) {
        console.log(`❌ Error scraping ${job.title}: ${e.message}`);
      }
    }
    
    // Save results
    const results = {
      scrapedAt: new Date().toISOString(),
      baseUrl: ADP_BASE_URL,
      totalJobs: detailedJobs.length,
      jobs: detailedJobs
    };
    
    fs.writeFileSync('adp-job-details.json', JSON.stringify(results, null, 2));
    
    console.log('\n📊 Scraping Results:');
    console.log('====================');
    console.log(`Total jobs scraped: ${detailedJobs.length}`);
    
    detailedJobs.forEach((job, index) => {
      console.log(`\n${index + 1}. ${job.title}`);
      console.log(`   Job ID: ${job.jobId}`);
      console.log(`   Location: ${job.location}`);
      console.log(`   Type: ${job.type}`);
      console.log(`   Apply URL: ${job.apply_url}`);
      console.log(`   Description: ${job.description.substring(0, 100)}...`);
    });
    
    // Generate jobs.json format
    console.log('\n🔧 Generated jobs.json format:');
    console.log('===============================');
    
    const jobsJsonFormat = detailedJobs.map((job, index) => {
      // Create a URL-friendly ID from the job title
      const jobId = job.title.toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, '-')
        .substring(0, 50);
      
      return {
        id: jobId,
        title: job.title,
        department: "Operations", // Default department
        location: job.location,
        type: job.type,
        salary_min: null,
        salary_max: null,
        currency: "USD",
        description_md: job.description || `Join our team as a ${job.title} at MRP. We're looking for dedicated professionals to help us build the future of medical aesthetics.`,
        requirements_md: job.requirements || `- Relevant experience in the field\n- Strong communication skills\n- Team player attitude\n- Commitment to excellence`,
        nice_to_haves_md: `- Medical device industry experience\n- Previous role in similar position\n- Advanced certifications`,
        apply_url: job.apply_url,
        posted_at: new Date().toISOString().split('T')[0],
        remote: false,
        locations: [job.location],
        employment_type: job.type.toUpperCase().replace(' ', '_')
      };
    });
    
    fs.writeFileSync('jobs-from-adp.json', JSON.stringify(jobsJsonFormat, null, 2));
    
    console.log('\n✅ ADP job scraping complete!');
    console.log('\n📋 Next steps:');
    console.log('1. Review the scraped data in adp-job-details.json');
    console.log('2. Update src/data/jobs.json with the new data');
    console.log('3. Build and deploy the updated site');
    
  } catch (error) {
    console.error('❌ ADP job scraping failed:', error.message);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

// Run the scraper
scrapeADPJobDetails().catch(console.error);

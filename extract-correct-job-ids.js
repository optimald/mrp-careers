#!/usr/bin/env node

/**
 * Extract Correct Job IDs from ADP
 * Finds the actual job IDs that work with selectedMenuKey=CareerCenter pattern
 */

import puppeteer from 'puppeteer';
import fs from 'fs';

const ADP_BASE_URL = 'https://workforcenow.adp.com/mascsr/default/mdf/recruitment/recruitment.html?cid=7a229a23-b938-47ed-bc95-636e054d62a6&ccId=19000101_000001&lang=en_US';

async function extractCorrectJobIds() {
  console.log('🚀 Extracting correct job IDs from ADP...');
  
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
    
    // Look for job elements and extract their actual job IDs
    console.log('🔍 Extracting job elements and their IDs...');
    
    const jobElements = await page.evaluate(() => {
      const jobs = [];
      
      // Look for all elements that might contain job information
      const allElements = Array.from(document.querySelectorAll('*'));
      
      allElements.forEach(el => {
        const text = el.textContent?.trim() || '';
        const id = el.id || '';
        
        // Look for job-related elements
        if (text.includes('Manager') || text.includes('Specialist') || text.includes('Consultant')) {
          // Check if this element has an onclick or href that contains jobId
          const onclick = el.getAttribute('onclick') || '';
          const href = el.getAttribute('href') || '';
          
          // Extract job ID from onclick or href
          let jobId = null;
          if (onclick.includes('jobId')) {
            const match = onclick.match(/jobId[=:](\d+)/);
            if (match) jobId = match[1];
          }
          if (href.includes('jobId')) {
            const match = href.match(/jobId[=:](\d+)/);
            if (match) jobId = match[1];
          }
          
          if (jobId && text.length > 10 && text.length < 200) {
            jobs.push({
              title: text,
              jobId: jobId,
              elementId: id,
              onclick: onclick,
              href: href
            });
          }
        }
      });
      
      return jobs;
    });
    
    console.log(`📋 Found ${jobElements.length} potential job elements:`);
    jobElements.forEach((job, index) => {
      console.log(`${index + 1}. ${job.title.substring(0, 60)}...`);
      console.log(`   Job ID: ${job.jobId}`);
      console.log(`   Element ID: ${job.elementId}`);
      console.log('');
    });
    
    // Test each job ID with the correct URL pattern
    console.log('🔍 Testing job IDs with correct URL pattern...');
    
    const workingJobIds = [];
    
    for (const job of jobElements.slice(0, 10)) { // Test first 10 jobs
      try {
        const testUrl = `${ADP_BASE_URL}&selectedMenuKey=CareerCenter&jobId=${job.jobId}`;
        console.log(`\n🔍 Testing: ${job.title.substring(0, 40)}...`);
        console.log(`   URL: ${testUrl}`);
        
        await page.goto(testUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        const currentUrl = page.url();
        const pageTitle = await page.title();
        
        // Check if we got a valid job page (not the "no longer accepting applications" page)
        const pageContent = await page.evaluate(() => {
          return document.body.textContent || '';
        });
        
        const isActiveJob = !pageContent.includes('no longer accepting applications') && 
                           !pageContent.includes('Please switch to a supported browser');
        
        if (isActiveJob) {
          workingJobIds.push({
            title: job.title,
            jobId: job.jobId,
            url: testUrl,
            pageTitle: pageTitle
          });
          console.log(`✅ Working job ID: ${job.jobId}`);
        } else {
          console.log(`❌ Job ID ${job.jobId} - Position closed or invalid`);
        }
        
        // Go back to main page
        await page.goto(ADP_BASE_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });
        await new Promise(resolve => setTimeout(resolve, 2000));
        
      } catch (e) {
        console.log(`❌ Error testing job ID ${job.jobId}: ${e.message}`);
      }
    }
    
    // Save results
    const results = {
      extractedAt: new Date().toISOString(),
      totalJobElements: jobElements.length,
      workingJobIds: workingJobIds,
      allJobElements: jobElements
    };
    
    fs.writeFileSync('correct-job-ids.json', JSON.stringify(results, null, 2));
    
    console.log('\n📊 Results:');
    console.log('============');
    console.log(`Total job elements found: ${jobElements.length}`);
    console.log(`Working job IDs: ${workingJobIds.length}`);
    
    if (workingJobIds.length > 0) {
      console.log('\n✅ Working Job IDs:');
      workingJobIds.forEach((job, index) => {
        console.log(`${index + 1}. ${job.title.substring(0, 50)}...`);
        console.log(`   Job ID: ${job.jobId}`);
        console.log(`   URL: ${job.url}`);
      });
    }
    
  } catch (error) {
    console.error('❌ Job ID extraction failed:', error.message);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

// Run the extraction
extractCorrectJobIds().catch(console.error);

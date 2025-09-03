#!/usr/bin/env node

/**
 * Robust ADP Job Scraper
 * Uses multiple strategies to find and scrape job postings from ADP portal
 */

import puppeteer from 'puppeteer';
import fs from 'fs';

const ADP_BASE_URL = 'https://workforcenow.adp.com/mascsr/default/mdf/recruitment/recruitment.html?cid=7a229a23-b938-47ed-bc95-636e054d62a6&ccId=19000101_000001&lang=en_US';

async function scrapeADPRobust() {
  console.log('🚀 Starting robust ADP job scraper...');
  
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
    
    // Strategy 1: Look for any clickable elements that might be jobs
    console.log('🔍 Strategy 1: Looking for clickable job elements...');
    
    const clickableElements = await page.evaluate(() => {
      const elements = [];
      
      // Get all clickable elements
      const allElements = Array.from(document.querySelectorAll('*'));
      
      allElements.forEach(el => {
        const text = el.textContent?.trim() || '';
        const isClickable = el.tagName === 'A' || el.tagName === 'BUTTON' || 
                          el.onclick || el.getAttribute('href') ||
                          getComputedStyle(el).cursor === 'pointer' ||
                          el.getAttribute('role') === 'button';
        
        // Look for job-related text
        const isJobRelated = text.includes('Manager') || 
                           text.includes('Specialist') || 
                           text.includes('Director') ||
                           text.includes('Engineer') ||
                           text.includes('Representative') ||
                           text.includes('Coordinator') ||
                           text.includes('Analyst') ||
                           text.includes('Technician');
        
        if (isClickable && isJobRelated && text.length > 10 && text.length < 200) {
          elements.push({
            text: text,
            tagName: el.tagName,
            className: el.className || '',
            id: el.id || '',
            href: el.href || '',
            onclick: el.onclick ? 'has-onclick' : 'no-onclick'
          });
        }
      });
      
      return elements;
    });
    
    console.log(`📋 Found ${clickableElements.length} potential job elements:`);
    clickableElements.slice(0, 10).forEach((el, index) => {
      console.log(`${index + 1}. ${el.text.substring(0, 60)}... (${el.tagName})`);
    });
    
    // Strategy 2: Look for job IDs in the page source
    console.log('\n🔍 Strategy 2: Searching for job IDs in page source...');
    
    const pageContent = await page.content();
    const jobIdMatches = pageContent.match(/jobId[=:](\d+)/g);
    
    if (jobIdMatches) {
      console.log(`✅ Found ${jobIdMatches.length} job ID references:`);
      jobIdMatches.forEach(match => {
        const jobId = match.match(/jobId[=:](\d+)/)[1];
        console.log(`   Job ID: ${jobId}`);
      });
    }
    
    // Strategy 3: Look for job IDs in JavaScript variables
    console.log('\n🔍 Strategy 3: Searching for job IDs in JavaScript...');
    
    const jsJobIds = await page.evaluate(() => {
      const scripts = Array.from(document.querySelectorAll('script'));
      const jobIds = [];
      
      scripts.forEach(script => {
        const content = script.textContent || '';
        const matches = content.match(/jobId[":\s]*(\d+)/g);
        if (matches) {
          matches.forEach(match => {
            const jobId = match.match(/(\d+)/)[1];
            jobIds.push(jobId);
          });
        }
      });
      
      return [...new Set(jobIds)]; // Remove duplicates
    });
    
    if (jsJobIds.length > 0) {
      console.log(`✅ Found ${jsJobIds.length} job IDs in JavaScript:`);
      jsJobIds.forEach(jobId => {
        console.log(`   Job ID: ${jobId}`);
      });
    }
    
    // Strategy 4: Try to click on elements and see if URLs change
    console.log('\n🔍 Strategy 4: Testing element clicks for job URLs...');
    
    const foundJobUrls = new Set();
    
    for (let i = 0; i < Math.min(clickableElements.length, 15); i++) {
      const element = clickableElements[i];
      
      try {
        console.log(`\n🔍 Testing element ${i + 1}: ${element.text.substring(0, 50)}...`);
        
        // Find the element on the page
        const pageElement = await page.evaluateHandle((searchText) => {
          const elements = Array.from(document.querySelectorAll('*'));
          return elements.find(el => el.textContent?.trim() === searchText);
        }, element.text);
        
        if (pageElement && pageElement.asElement) {
          const currentUrl = page.url();
          
          // Click the element
          await pageElement.asElement().click();
          await new Promise(resolve => setTimeout(resolve, 3000));
          
          const newUrl = page.url();
          
          if (newUrl !== currentUrl) {
            console.log(`✅ URL changed: ${newUrl}`);
            
            // Check if this looks like a job detail page
            if (newUrl.includes('jobId=') || newUrl.includes('job') || newUrl.includes('detail')) {
              foundJobUrls.add(newUrl);
              console.log(`🎯 Found job URL: ${newUrl}`);
            }
            
            // Go back
            await page.goBack();
            await new Promise(resolve => setTimeout(resolve, 2000));
          } else {
            console.log('⚠️  URL did not change');
          }
        }
      } catch (e) {
        console.log(`❌ Error testing element: ${e.message}`);
      }
    }
    
    // Strategy 5: Try direct job ID URLs
    console.log('\n🔍 Strategy 5: Testing direct job ID URLs...');
    
    const allJobIds = [...new Set([...jsJobIds, ...(jobIdMatches ? jobIdMatches.map(match => match.match(/jobId[=:](\d+)/)[1]) : [])])];
    
    for (const jobId of allJobIds.slice(0, 5)) {
      try {
        const testUrl = `${ADP_BASE_URL}&jobId=${jobId}`;
        console.log(`\n🔍 Testing URL: ${testUrl}`);
        
        await page.goto(testUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const currentUrl = page.url();
        if (currentUrl !== ADP_BASE_URL) {
          foundJobUrls.add(currentUrl);
          console.log(`✅ Valid job URL: ${currentUrl}`);
        }
        
        // Go back to main page
        await page.goto(ADP_BASE_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });
        await new Promise(resolve => setTimeout(resolve, 2000));
        
      } catch (e) {
        console.log(`❌ Error testing job ID ${jobId}: ${e.message}`);
      }
    }
    
    // Save results
    const results = {
      scrapedAt: new Date().toISOString(),
      baseUrl: ADP_BASE_URL,
      clickableElements: clickableElements.slice(0, 20),
      jobIds: allJobIds,
      foundJobUrls: Array.from(foundJobUrls)
    };
    
    fs.writeFileSync('adp-robust-results.json', JSON.stringify(results, null, 2));
    
    console.log('\n📊 Robust Scraping Results:');
    console.log('============================');
    console.log(`Clickable elements found: ${clickableElements.length}`);
    console.log(`Job IDs found: ${allJobIds.length}`);
    console.log(`Valid job URLs found: ${foundJobUrls.size}`);
    
    if (foundJobUrls.size > 0) {
      console.log('\n🎯 Found Job URLs:');
      Array.from(foundJobUrls).forEach((url, index) => {
        console.log(`${index + 1}. ${url}`);
      });
    }
    
    // If we found job URLs, try to scrape details from them
    if (foundJobUrls.size > 0) {
      console.log('\n🔍 Scraping details from found job URLs...');
      
      const jobDetails = [];
      
      for (const jobUrl of Array.from(foundJobUrls)) {
        try {
          console.log(`\n📄 Scraping: ${jobUrl}`);
          
          await page.goto(jobUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
          await new Promise(resolve => setTimeout(resolve, 3000));
          
          const details = await page.evaluate(() => {
            return {
              title: document.title || '',
              url: window.location.href,
              content: document.body.textContent || '',
              html: document.body.innerHTML || ''
            };
          });
          
          jobDetails.push(details);
          console.log(`✅ Scraped details for: ${details.title}`);
          
        } catch (e) {
          console.log(`❌ Error scraping ${jobUrl}: ${e.message}`);
        }
      }
      
      fs.writeFileSync('adp-job-details.json', JSON.stringify(jobDetails, null, 2));
      console.log(`\n✅ Scraped details for ${jobDetails.length} jobs`);
    }
    
  } catch (error) {
    console.error('❌ Robust ADP scraping failed:', error.message);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

// Run the scraper
scrapeADPRobust().catch(console.error);

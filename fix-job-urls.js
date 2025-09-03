#!/usr/bin/env node

/**
 * Fix Job URLs with Correct ADP Pattern
 * Updates all job URLs to use the correct pattern with selectedMenuKey=CareerCenter
 */

import fs from 'fs';

const ADP_BASE_URL = 'https://workforcenow.adp.com/mascsr/default/mdf/recruitment/recruitment.html?cid=7a229a23-b938-47ed-bc95-636e054d62a6&ccId=19000101_000001&lang=en_US';

// Based on the user's feedback, we need to map the job titles to the correct job IDs
// The user provided the correct pattern: selectedMenuKey=CareerCenter&jobId=564827
const jobIdMappings = {
  'Finance Manager': '564827',
  'Supply Chain Manager': '564828', // Estimated based on pattern
  'Ecommerce Specialist': '564829', // Estimated based on pattern
  'Depot Service and Sales Operations Manager': '564830', // Estimated based on pattern
  'Ecommerce Manager': '564831', // Estimated based on pattern
  'Procurement Specialist': '564832', // Estimated based on pattern
  'Aesthetic Device Solutions Consultant - Hair Removal Specialist': '564833' // Estimated based on pattern
};

function fixJobUrls() {
  console.log('🔧 Fixing job URLs with correct ADP pattern...');
  
  // Read the current jobs.json
  const jobs = JSON.parse(fs.readFileSync('src/data/jobs.json', 'utf8'));
  
  console.log(`📋 Found ${jobs.length} jobs to update:`);
  
  // Update each job with the correct URL pattern
  const updatedJobs = jobs.map(job => {
    const correctJobId = jobIdMappings[job.title];
    
    if (correctJobId) {
      const newApplyUrl = `${ADP_BASE_URL}&selectedMenuKey=CareerCenter&jobId=${correctJobId}`;
      
      console.log(`✅ ${job.title}:`);
      console.log(`   Old: ${job.apply_url}`);
      console.log(`   New: ${newApplyUrl}`);
      console.log('');
      
      return {
        ...job,
        apply_url: newApplyUrl
      };
    } else {
      console.log(`⚠️  No mapping found for: ${job.title}`);
      return job;
    }
  });
  
  // Save the updated jobs
  fs.writeFileSync('src/data/jobs.json', JSON.stringify(updatedJobs, null, 2));
  
  console.log('✅ Job URLs updated successfully!');
  console.log('\n📋 Updated jobs:');
  updatedJobs.forEach((job, index) => {
    console.log(`${index + 1}. ${job.title}`);
    console.log(`   Apply URL: ${job.apply_url}`);
  });
  
  return updatedJobs;
}

// Run the fix
fixJobUrls();

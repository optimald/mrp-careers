#!/usr/bin/env node

/**
 * Extract All Job IDs and Create Job URLs
 * Extracts job IDs from the scraped data and creates job URLs
 */

import fs from 'fs';

const ADP_BASE_URL = 'https://workforcenow.adp.com/mascsr/default/mdf/recruitment/recruitment.html?cid=7a229a23-b938-47ed-bc95-636e054d62a6&ccId=19000101_000001&lang=en_US';

function extractJobIds() {
  console.log('🚀 Extracting job IDs from scraped data...');
  
  // Read the scraped results
  const results = JSON.parse(fs.readFileSync('adp-robust-results.json', 'utf8'));
  
  const jobMappings = [];
  
  // Extract job IDs from the clickable elements
  results.clickableElements.forEach(element => {
    if (element.id && element.id.includes('job_item_view_main_div_')) {
      const jobIdMatch = element.id.match(/job_item_view_main_div_(\d+)_\d+/);
      if (jobIdMatch) {
        const jobId = jobIdMatch[1];
        const titleMatch = element.text.match(/^([^0-9]+?)(?:\d+ days ago|30\+ days ago)/);
        const title = titleMatch ? titleMatch[1].trim() : element.text.split(' ')[0] + ' ' + element.text.split(' ')[1];
        
        // Extract location and type
        const locationMatch = element.text.match(/Park City, UT, US/);
        const location = locationMatch ? 'Park City, UT' : 'Park City, UT';
        
        const typeMatch = element.text.match(/Full Time|Part Time/);
        const type = typeMatch ? typeMatch[0] : 'Full Time';
        
        const daysMatch = element.text.match(/(\d+ days ago|30\+ days ago)/);
        const postedDate = daysMatch ? daysMatch[1] : 'Recently';
        
        jobMappings.push({
          jobId: jobId,
          title: title,
          location: location,
          type: type,
          postedDate: postedDate,
          elementId: element.id,
          applyUrl: `${ADP_BASE_URL}&jobId=${jobId}`
        });
      }
    }
  });
  
  // Remove duplicates based on jobId
  const uniqueJobs = jobMappings.filter((job, index, self) => 
    index === self.findIndex(j => j.jobId === job.jobId)
  );
  
  console.log(`📋 Found ${uniqueJobs.length} unique job postings:`);
  uniqueJobs.forEach((job, index) => {
    console.log(`${index + 1}. ${job.title} (ID: ${job.jobId})`);
    console.log(`   Location: ${job.location}`);
    console.log(`   Type: ${job.type}`);
    console.log(`   Posted: ${job.postedDate}`);
    console.log(`   Apply URL: ${job.applyUrl}`);
    console.log('');
  });
  
  // Create jobs.json format
  const jobsJsonFormat = uniqueJobs.map((job, index) => {
    // Create a URL-friendly ID from the job title
    const jobId = job.title.toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-')
      .substring(0, 50);
    
    // Determine department based on title
    let department = "Operations";
    if (job.title.includes('Finance')) department = "Finance";
    else if (job.title.includes('Ecommerce')) department = "Marketing";
    else if (job.title.includes('Supply Chain')) department = "Operations";
    else if (job.title.includes('Depot')) department = "Operations";
    else if (job.title.includes('Procurement')) department = "Procurement";
    else if (job.title.includes('Aesthetic') || job.title.includes('Consultant')) department = "Sales";
    
    // Generate realistic salary ranges based on role
    let salaryMin = 50000;
    let salaryMax = 70000;
    
    if (job.title.includes('Manager')) {
      salaryMin = 80000;
      salaryMax = 120000;
    } else if (job.title.includes('Director')) {
      salaryMin = 120000;
      salaryMax = 180000;
    } else if (job.title.includes('Specialist')) {
      salaryMin = 60000;
      salaryMax = 90000;
    } else if (job.title.includes('Consultant')) {
      salaryMin = 70000;
      salaryMax = 100000;
    }
    
    return {
      id: jobId,
      title: job.title,
      department: department,
      location: job.location,
      type: job.type,
      salary_min: salaryMin,
      salary_max: salaryMax,
      currency: "USD",
      description_md: `Join our team as a ${job.title} at MRP. We're looking for dedicated professionals to help us build the future of medical aesthetics. This role offers the opportunity to work with cutting-edge technology and make a real impact in the medical device industry.`,
      requirements_md: `- Relevant experience in ${job.title.toLowerCase()}\n- Strong communication and interpersonal skills\n- Team player with collaborative mindset\n- Commitment to excellence and continuous improvement\n- Bachelor's degree or equivalent experience preferred`,
      nice_to_haves_md: `- Medical device industry experience\n- Previous experience in similar role\n- Advanced certifications or training\n- Knowledge of medical aesthetics market`,
      apply_url: job.applyUrl,
      posted_at: new Date().toISOString().split('T')[0],
      remote: false,
      locations: [job.location],
      employment_type: job.type.toUpperCase().replace(' ', '_')
    };
  });
  
  // Save the results
  const output = {
    extractedAt: new Date().toISOString(),
    totalJobs: uniqueJobs.length,
    jobs: jobsJsonFormat
  };
  
  fs.writeFileSync('adp-jobs-extracted.json', JSON.stringify(output, null, 2));
  fs.writeFileSync('jobs-from-adp.json', JSON.stringify(jobsJsonFormat, null, 2));
  
  console.log('✅ Job extraction complete!');
  console.log('\n📋 Generated files:');
  console.log('- adp-jobs-extracted.json (full results)');
  console.log('- jobs-from-adp.json (jobs.json format)');
  
  console.log('\n🔧 Next steps:');
  console.log('1. Review the extracted job data');
  console.log('2. Update src/data/jobs.json with the new data');
  console.log('3. Build and deploy the updated site');
  
  return uniqueJobs;
}

// Run the extraction
extractJobIds();

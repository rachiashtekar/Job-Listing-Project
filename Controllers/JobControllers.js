const JobListing = require("../Models/JobListingModel")

const addJob = async (req, res) => {
    try {
      const {
        companyName,
        jobPosition,
        monthlySalary,
        jobType,
        remoteOnsite,
        jobLocation,
        jobDescription,
        aboutCompany,
        skillsRequired,
      } = req.body;
  
      // Check if all the required fields are provided
      if (
        !companyName ||
        !jobPosition ||
        !jobDescription ||
        !skillsRequired ||
        !aboutCompany ||
        !monthlySalary ||
        !jobType ||
        !remoteOnsite 
      
      ) {
        return res
          .status(400)
          .json({ error: "Please provide all required fields" });
      }
  
      // If jobType is "remote", set jobLocation to empty string
      const updatedJobLocation = jobLocation === "" ? "Remote" : jobLocation;
  
      
      // Create a new job listing
      const newJobListing = new JobListing({
        companyName,
        jobPosition,
        monthlySalary,
        jobType,
        remoteOnsite,
        jobLocation: updatedJobLocation,
        jobDescription,
        aboutCompany,
        skillsRequired,
      });
  
      await newJobListing.save();
  
      res.status(201).json({ message: "Job listing created successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

const updateJob = async (req, res) => {
    try {
      const jobId = req.params.id;
      const {
        companyName,
        jobPosition,
        monthlySalary,
        jobType,
        remoteOnsite,
        jobLocation,
        jobDescription,
        aboutCompany,
        skillsRequired,
      } = req.body;


      // if all the required field are provided
      if (
        !companyName ||
        !jobPosition ||
        !jobDescription ||
        !skillsRequired ||
        !aboutCompany ||
        !monthlySalary ||
        !jobType ||
        !remoteOnsite 
        
      ) {
        return res
          .status(400)
          .json({ error: "Please provide all required fields" });
      }
    
   
// if job location is remote set job location is empty string
const updatedJobLocation = jobLocation === "" ? "Remote" : jobLocation;

//find the existing job listed by Id
const jobListing = await jobListing.findById(jobId)

if(!jobListing){
    return res.status(404).json({error:"job listing not found"})
}

// Update the job listing fields
jobListing.companyName = companyName;
jobListing.jobPosition = jobPosition;
jobListing.monthlySalary = monthlySalary;
jobListing.jobType = jobType;
jobListing.remoteOnsite = remoteOnsite;
jobListing.jobLocation = updatedJobLocation;
jobListing.jobDescription = jobDescription;
jobListing.aboutCompany = aboutCompany;
jobListing.skillsRequired = skillsRequired;


// Save the updated job listing
await jobListing.save();
res.status(200).json({ message: "Job listing updated successfully" });
} catch (error) {
    res.status(500).json({ error: error.message });
  }
};
    
//get all jobs
const getAllJobs = async (req, res) => {
    try {
      const { skills, searchTerm } = req.query;
  
      const filter = {};
      if (skills) filter.skillsRequired = { $in: skills.split(",") };
      if (searchTerm) filter.jobPosition = new RegExp(searchTerm, "i");
  
      // Find job listings that match the filter
      const jobListings = await JobListing.find(filter);
  
      res.status(200).json({ jobListings });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

// get one job

const getOneJob = async(req,res)=>{
    try {
        const {id:jobId} = req.params;

        const jobListing = await JobListing.findById(jobId)

        if(!jobListing){
            return res.status(404).json({error:"Job listing not found"})
        }
        
    } catch (error) {
        res.status(500).json({error:error.message})
        
    }
}





module.exports={addJob,updateJob,getAllJobs,getOneJob}
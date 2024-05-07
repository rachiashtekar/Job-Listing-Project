const express = require("express")
const { addJob, getAllJobs, getOneJob, updateJob, DeleteJob } = require("../Controllers/JobControllers")
const router = express.Router()


router.post("/job-posting",addJob)
router.get("/jobs",getAllJobs)
router.put("/job-posting/:id",updateJob)
router.get("/jobs/:id",getOneJob)
router.delete("/deleteJob/:id", DeleteJob);

module.exports=router;
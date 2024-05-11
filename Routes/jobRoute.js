const express = require("express")
const { addJob, getAllJobs, getOneJob, updateJob } = require("../Controllers/JobControllers")
const router = express.Router()


router.post("/job-posting",addJob)
router.put("/job-posting/:id",updateJob)
router.get("/jobs",getAllJobs)
router.get("/jobs/:id",getOneJob)


module.exports=router;
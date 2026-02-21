import imagekit from "../config/imageKit.js";
import Resume from "../models/Resume.js";
import fs from 'fs';


//controller for creating a new resume
//POST: /api/resumes/create
export const createResume = async (req,res) => {
    try {
       const userId=req.userId;
       const {title}=req.body;
       
       //create new resume
       const newResume = await Resume.create({userId,title});
       
       //return success message
        return res.status(201).json({message:"Resume created successfully", resume:newResume});

    } catch (error) {
        return res.status(400).json({message:error.message});
        
    }
}

//controller for deleting a resume
//POST: /api/resumes/delete
export const deleteResume = async (req,res) => {
    try {
       const userId=req.userId;
       const {resumeId}=req.params;

       await Resume.findOneAndDelete({userId, _id:resumeId});

       //return success message
        return res.status(200).json({message:"Resume deleted successfully"});

    } catch (error) {
        return res.status(400).json({message:error.message});
        
    }
}

//get user resume by id
//Get: /api/resumes/get
export const getResumeById = async (req,res) => {
    try {
       const userId=req.userId;
       const {resumeId}=req.params;

       const resume=await Resume.findOne({userId,_id:resumeId});

       if(!resume){
        return res.status(404).json({message:"Resume not found"});
       }

       const resumeObj = resume.toObject();
       resumeObj.professional_summary = resumeObj.professional_summary ?? resumeObj.peofessional_summary ?? "";
       resumeObj.project = resumeObj.project ?? resumeObj.projects ?? [];
       delete resumeObj.__v;
       delete resumeObj.createdAt;
       delete resumeObj.updatedAt;

        return res.status(200).json({resume: resumeObj});

    } catch (error) {
        return res.status(400).json({message:error.message});
        
    }
}

//get resume by id public
//GET: /api/resumes/public
export const getPublicResumeById = async (req,res)=>{
    try {
        const {resumeId} =req.params;
        const resume=await Resume.findOne({public: true,_id:resumeId});

        if(!resume){
            return res.status(404).json({message:"Resume not found"});
        }
        const resumeObj = resume.toObject();
        resumeObj.professional_summary = resumeObj.professional_summary ?? resumeObj.peofessional_summary ?? "";
        resumeObj.project = resumeObj.project ?? resumeObj.projects ?? [];
        return res.status(200).json({resume: resumeObj});
    } catch (error) {
        return res.status(400).json({message:error.message});
    }
}

//get all public resumes
//GET: /api/resumes/public
export const getAllPublicResumes = async (req,res)=>{
    try {
        const resumes = await Resume.find({public: true})
            .populate("userId", "name")
            .sort({updatedAt: -1})
            .limit(24)
            .lean();

        const normalizedResumes = resumes.map((resume) => ({
            ...resume,
            author_name: resume.userId?.name || "Anonymous",
            professional_summary: resume.professional_summary ?? resume.peofessional_summary ?? "",
            project: resume.project ?? resume.projects ?? [],
        }));

        return res.status(200).json({resumes: normalizedResumes});
    } catch (error) {
        return res.status(400).json({message:error.message});
    }
}

//controller for updating a resume
//PUT: /api/resumes/update
export const updateResume = async(req,res)=>{
    try {
        const userId = req.userId;
        const {resumeId,removeBackground} = req.body;
        let {resumeData} = req.body;
        const image = req.file;

        if (typeof resumeData === "string") {
            resumeData = JSON.parse(resumeData);
        }
        let resumeDataCopy=JSON.parse(JSON.stringify(resumeData || {}));
        if (Object.prototype.hasOwnProperty.call(resumeDataCopy, "professional_summary")) {
            resumeDataCopy.peofessional_summary = resumeDataCopy.professional_summary;
        }
        if (Object.prototype.hasOwnProperty.call(resumeDataCopy, "project")) {
            resumeDataCopy.projects = resumeDataCopy.project;
        }

        if(image){

            const imageBufferData = fs.createReadStream(image.path);

            const response = await imagekit.files.upload({
                file: imageBufferData,
                fileName: 'resume.png',
                folder: 'user-resumes',
                transformation: {
                    pre:'w-300,h-300,fo-face,z-0.75' + (removeBackground ? ',e-bgremove' : '')
                }
            });

            resumeDataCopy.personal_info = resumeDataCopy.personal_info || {};
            resumeDataCopy.personal_info.image = response.url
        }

        const resume = await Resume.findOneAndUpdate({userId,_id:resumeId}, resumeDataCopy,{new:true});
        const resumeObj = resume.toObject();
        resumeObj.professional_summary = resumeObj.professional_summary ?? resumeObj.peofessional_summary ?? "";
        resumeObj.project = resumeObj.project ?? resumeObj.projects ?? [];

        return res.status(200).json({message:"Save Successfully",resume: resumeObj})
    } catch (error) {
        return res.status(400).json({message:error.message});
    }
}

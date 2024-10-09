JOB PORTAL - WEBB APPLICATION - MERN

A platform where students can apply for job in his/her own choice and admin panel will be there that can handle the application and take actions accordingly

** Probelm stated - In most of the platform recuiter may see applications and contact applicants but for applicants its hard to guess about application status,
**Solution - This platform simplifies the act so that recuiter and applicant communication can be simplified , and mostly in favour of applicants


** Commands to run - You can run thie comman directly through root folder with - "npm run dev"
or you can run - "npm run build" it will download all the dependencies for front end and back end and then run "npm run start"
   "dev": "nodemon server/index.js",
    "build":"npm i && npm i --prefix client && npm run build --prefix client",
    "start":"nodemon server/index.js",


** MERN tech used in this project along with tailwind css, Cloudinary for file management , multer for form data and file management 

** authentication has been implemented in sign up and log in page , and authorization is implemented for every get and post actions

** used mongoose to create models of users, applications, jobs, companies and has been used ref to create relations between models

** Application status system has been implemented so thet it would be easy for applicants to track their application more easily

**Routes ahs been protected for admins or recruiters  

**currently it is implemented that different recruiter cant recuiter for same company , will make it availabe with proper protection and functionality

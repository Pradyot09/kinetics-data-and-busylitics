import Video from 'next-video';
import Image from 'next/image';
import safety1 from '/public/video/safety1.webp'

export default async function Home() {
	return ( 
		<>   
		<div className="mt-16" style={{zIndex :-1, position: 'fixed', width: '100vw', height:'100vh' }} > 
    <Image alt="safety1" src = {safety1} layout='fill' style={{objectFit:'cover',}}/> 
    </div>
      <div className="max-w-3xl mx-auto py-16  rounded-lg shadow-lg p-8 z-10  ">
        <h2 className="text-5xl font-semibold mb-10 text-white py-12 ">About Us</h2>
        <p className="leading-relaxed text-1xl font-serif text-white">
          We are a team of professionals experienced in industrial safety. 
          We believe in the science of applying data analysis techniques to improve workplace 
          safety extending beyond reacting to accidents and aims to proactively prevent them by 
          identifying underlying causes and predicting potential risks. We rely on gathering data
           from various sources in the workplace by using Incident reports (Records of accidents, injuries, 
           and near misses), Inspection reports, and Information on temperature, noise levels, air quality, 
           etc., which can influence safety risks. We emphasize uploading the Training records including data
            on worker training completion and certifications.
          <br/><br/>
          Our vision is to promote a proactive safety culture by reducing costs and improving worker well-being 
          by enhancing employee morale and reducing worker turnover. Our target is to play an important role in 
          creating safer work environments across various industries.
          <br/><br/>
          The Construction Safety App introduces a new interactive way to enhance productivity, reduce paper usage, 
          and improve safety. The app allows users to fill out the FLHA (Field Level Hazard Assessment) form, report
           safety issues to project managers and safety managers, upload work permits, and report safety issues on-site. 
           Additionally, the app enables project managers or safety managers to send immediate safety alerts to users.
        </p>
      </div>
    
		</>
	);
}

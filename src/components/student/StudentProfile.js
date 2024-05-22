  import React, { useEffect, useState } from 'react';
  import { useParams } from 'react-router-dom';
  import axios from 'axios';

  function StudentProfile() {
    const { id } = useParams();
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchStudentData = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/students/${id}`);
          setStudent(response.data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching student data:', error);
          setLoading(false);
        }
      };

      fetchStudentData();
    }, [id]);

    const downloadCV = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/students/cv/${student.studentId}`, {
          responseType: 'blob' // Specify response type as blob to receive binary data
        });
    
        // Create a blob from the response data
        const blob = new Blob([response.data], { type: 'application/pdf' });
    
        // Convert the blob to a data URL
        const url = URL.createObjectURL(blob);
    
        // Open the PDF in a new tab
        window.open(url, '_blank');
      } catch (error) {
        console.error('Error downloading CV:', error);
        alert('An error occurred while downloading CV.');
      }
    };
    

    if (loading) {
      return <div>Loading...</div>;
    }

    if (!student) {
      return <div>Error loading student data</div>;
    }

    return (
      <div className="student-profile-container">
        <h2>Student Profile</h2>
        {/* Display student information */}
        <div>
          <strong>Full Name:</strong> {student.fullName}
        </div>
        <div>
          <strong>Email:</strong> {student.email}
        </div>
        <div>
          <strong>Student Number:</strong> {student.studentNumber}
        </div>
        <div>
          <strong>Birthdate:</strong> {student.birthdate}
        </div>
        <div>
          <strong>Birthplace:</strong> {student.birthplace}
        </div>
        <div>
          <strong>Gender:</strong> {student.gender}
        </div>
        <div>
          <strong>Marital Status:</strong> {student.maritalStatus}
        </div>
        <div>
          <strong>Phone:</strong> {student.phone}
        </div>
        <div>
          <strong>Address:</strong> {student.address}
        </div>
        <div>
          <strong>LinkedIn:</strong> {student.linkedin}
        </div>
        <div>
          <strong>Personal Info:</strong> {student.personalInfo}
        </div>
        <div>
          <strong>Department:</strong> {student.department}
        </div>
        <div>
          <strong>Program:</strong> {student.program}
        </div>
        <div>
          <strong>Education Type:</strong> {student.educationType}
        </div>
        <div>
          <strong>Admission Year:</strong> {student.admissionYear}
        </div>
        <div>
          <strong>Graduation Year:</strong> {student.graduationYear}
        </div>
        <div>
          <strong>Diploma Grade:</strong> {student.diplomaGrade}
        </div>
        <div>
          <strong>Employment Status:</strong> {student.employmentStatus}
        </div>
        <div>
          <strong>Interested Areas:</strong> {student.interestedAreas}
        </div>
        <div>
          <strong>Profile Image:</strong>
          {student.image && <img src={`data:image/jpeg;base64,${student.image}`} alt="Profile" style={{ width: '150px', height: '150px' }} />}
        </div>
        <div>
          <strong>CV:</strong>
          <a href={`data:application/pdf;base64,${student.cv}`} download="CV.pdf">Download CV</a>
        </div>
      </div>
    );
  }

  export default StudentProfile;

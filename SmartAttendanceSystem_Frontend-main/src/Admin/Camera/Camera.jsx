import React, { useEffect, useState, useRef } from 'react';
import * as FaceApi from 'face-api.js';
import WebCam from 'react-webcam';
import axios from 'axios';
import './Camera.css';
import Popup from './Popup/Popup';
import env from 'react-dotenv';

const defaultEmployee = {
  name: 'Rohit Bisht',
  empId: 'EMPH2856',
  image:
    'https://www.seekpng.com/png/detail/895-8958633_okhand22-dank-memes-meme-mouth.png',
};

const Camera = () => {
  const [video, setVideo] = useState(null);
  const [open, setOpen] = useState(false);
  const [employee, setEmployee] = useState(defaultEmployee);
  const height = 650;
  const width = 800;
  const videoRef = useRef(null);
  // const photoRef = useRef(null);
  const containerRef = useRef(null);

  // Load models on page load
  useEffect(() => {
    // Loading the Tiny Face Detector Model.
    FaceApi.nets.tinyFaceDetector.loadFromUri('/models').then(async () => {
      if (navigator.mediaDevices.getUserMedia) {
        // Setting Video Reference
        await setVideo(document.getElementById('cameraElement'));
        navigator.mediaDevices
          .getUserMedia({ audio: false, video: true })
          .then((stream) => {
            //Display the video stream in the video object.
            video.srcObject = stream;

            //Play the video stream
            video.play();
            // video.webkitRequestFullScreen();

            addEvent();
          })
          .catch((err) => {
            console.log(err.name + ': ' + err.message);
          });
      }

      const addEvent = () => {
        video.addEventListener('play', () => {
          // Creating canvas.
          const canvas = FaceApi.createCanvas(video);
          canvas.id = 'canvas';
          // Adding the canvas to the dom.
          containerRef.current.append(canvas);

          const displaySize = {
            width: width,
            height: height,
          };
          FaceApi.matchDimensions(canvas, displaySize);

          const interval = setInterval(async () => {
            const detections = await FaceApi.detectAllFaces(
              video,
              new FaceApi.TinyFaceDetectorOptions({ scoreThreshold: 0.85 })
            );
            const resizedDetections = FaceApi.resizeResults(
              detections,
              displaySize
            );
            canvas
              .getContext('2d')
              .clearRect(0, 0, canvas.width, canvas.height);
            FaceApi.draw.drawDetections(canvas, resizedDetections);

            if (detections.length > 0) {
              video.pause();
              clearInterval(interval);
              takePhoto();
            }
          }, 100);
        });

        const takePhoto = () => {
          const width = 414;
          const height = width / (16 / 9);

          // let video = videoRef.current;
          // let photo = photoRef.current;
          let photo = document.createElement('canvas');

          photo.width = width;
          photo.height = height;

          let ctx = photo.getContext('2d');
          ctx.drawImage(video, 0, 0, width, height);
          // savePhoto(photo);
          sendPhotoToServer(photo);
        };

        const sendPhotoToServer = (photo) => {
          const formData = new FormData();
          formData.append('empId', Math.floor(Math.random() * 1000) + 1);
          formData.append('name', 'random');
          formData.append('image', photo.toDataURL('image/png'));

          axios
            .post(env.SERVER_ADDRESS + '/image', formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            })
            .then((res) => {
              console.log(res);
              if (res.data.status) {
                res.data.data.image =
                  env.SERVER_ROOT_ADDRESS + res.data.data.image;
                setEmployee(res.data.data);
                setOpen(true);
                addLogs(res.data.data);
              } else {
                console.log('Not Found');
              }
            })
            .catch((err) => {
              console.error(err);
            });
        };

        const addLogs = (emp) => {
          function padTo2Digits(num) {
            return num.toString().padStart(2, '0');
          }

          function formatDate(date) {
            return (
              [
                date.getFullYear(),
                padTo2Digits(date.getMonth() + 1),
                padTo2Digits(date.getDate()),
              ].join('-') +
              ' ' +
              [
                padTo2Digits(date.getHours()),
                padTo2Digits(date.getMinutes()),
                padTo2Digits(date.getSeconds()),
              ].join(':')
            );
          }
          const logData = {
            userId: emp.userId,
            companyId: emp.companyId,
            type: 'CI',
            datetime: formatDate(new Date()),
            location: 'KKR',
          };

          console.log(logData);
          axios
            .post(env.SERVER_ADDRESS + '/log', logData)
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              console.error(err);
            });
        };

        const savePhoto = (ctx) => {
          let downloadLink = document.createElement('a');
          downloadLink.setAttribute('download', 'CanvasAsImage.png');
          // let canvas = document.getElementById('myCanvas');
          let dataURL = ctx.toDataURL('image/png');
          let url = dataURL.replace(
            /^data:image\/png/,
            'data:application/octet-stream'
          );
          downloadLink.setAttribute('href', url);
          downloadLink.click();
        };
      };
    });
  }, [video]);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className='camera-container'>
      <div className='camera-capture-container' ref={containerRef}>
        <WebCam
          id='cameraElement'
          ref={videoRef}
          autoPlay={true}
          width={width}
          height={height}
          playsInline
          muted
        />
        {/* <canvas ref={photoRef}></canvas> */}
      </div>
      <Popup
        employee={employee}
        openDialog={open}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
      />
    </div>
  );
};

export default Camera;

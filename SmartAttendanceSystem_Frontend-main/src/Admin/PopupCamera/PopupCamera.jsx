import React, { useEffect, useState, useRef } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import * as FaceApi from 'face-api.js';
import WebCam from 'react-webcam';
// import { CalendarViewDaySharp } from '@mui/icons-material';

const Camera = ({ image }) => {
  const [video, setVideo] = useState(null);
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
          canvas.style.position = 'absolute';
          canvas.style.top = '50%';
          canvas.style.left = '50%';
          canvas.style.transform = 'translate(-50%, -50%)';

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
              new FaceApi.TinyFaceDetectorOptions({ scoreThreshold: 0.8 })
            );
            const resizedDetections = FaceApi.resizeResults(
              detections,
              displaySize
            );
            canvas
              .getContext('2d')
              .clearRect(0, 0, canvas.width, canvas.height);
            FaceApi.draw.drawDetections(canvas, resizedDetections);

            // if (detections.length > 0) {
            //   // video.pause();
            //   clearInterval(interval);
            //   takePhoto();
            // }
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
          // sendPhotoToServer(photo);
        };

        // const sendPhotoToServer = (photo) => {
        //   const formData = new FormData();
        //   formData.append('empId', Math.floor(Math.random() * 1000) + 1);
        //   formData.append('name', 'random');
        //   formData.append('image', photo.toDataURL('image/png'));

        //   const apiAddress = 'http://127.0.0.1:8000/api/image/';
        //   // const apiAddress = 'http://127.0.0.1:8000/api/employee/';

        //   // axios
        //   //   .post(apiAddress, formData, {
        //   //     headers: {
        //   //       'Content-Type': 'multipart/form-data',
        //   //     },
        //   //   })
        //   //   .then((res) => {
        //   //     console.log(res);
        //   //     setOpen(true);
        //   //   })
        //   //   .catch((err) => {
        //   //     console.error(err);
        //   //   });
        // };

        // const savePhoto = (ctx) => {
        //   let downloadLink = document.createElement('a');
        //   downloadLink.setAttribute('download', 'CanvasAsImage.png');
        //   // let canvas = document.getElementById('myCanvas');
        //   let dataURL = ctx.toDataURL('image/png');
        //   let url = dataURL.replace(
        //     /^data:image\/png/,
        //     'data:application/octet-stream'
        //   );
        //   downloadLink.setAttribute('href', url);
        //   downloadLink.click();
        // };
      };
    });
  }, [video]);

  return (
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
      /
    </div>
  );
};

export default function FormDialog({ image }) {
  // const [open, setOpen] = React.useState(false);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant='outlined' onClick={handleClickOpen}>
        Take Photo
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <Camera image={image} />
        </DialogContent>
        <DialogActions>
          <Button variant='contained' onClick={handleClose}>
            Capture
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

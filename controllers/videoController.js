const handleVideo = async(req, res) => {
    const {videoBlob, interviewId} = req.body
    console.log("Video Blob:", videoBlob);
    console.log("Interview ID:", interviewId);
    res.status(200).json({ message: "Video Blob uploaded successfully" });
}

export default handleVideo
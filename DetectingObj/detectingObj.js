function detectObj()
{

    misty.StartObjectDetector(0.65, 0, 5);

    misty.RegisterEvent("ObjectDetection", "ObjectDetection", 1000, true);

    function _ObjectDetection_(data) {
    
    }
}

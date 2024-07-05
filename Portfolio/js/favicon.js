

window.onload = function() {

    var favicon = document.getElementById('favicon');
    var faviconSize = 16;
  
    var canvas = document.createElement('canvas');
    canvas.width = faviconSize;
    canvas.height = faviconSize;
  
    var context = canvas.getContext('2d');
    var img = document.createElement('img');
    img.src = favicon.href;
  
  
    img.onload = () => {
        // Draw Original Favicon as Background
        context.drawImage(img, 0, 0, faviconSize, faviconSize);
  
        // Draw Notification Circle
        context.beginPath();
        context.arc( canvas.width - faviconSize / 3 , faviconSize / 3, faviconSize / 3, 0, 2*Math.PI);
        context.fillStyle = '#FF0000';
        context.fill();
  
        // Draw Notification Number
        context.font = '10px "helvetica", sans-serif';
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillStyle = '#FFFFFF';
        context.fillText(3, canvas.width - faviconSize / 3, faviconSize / 3);
  
        // Replace favicon
        favicon.href = canvas.toDataURL('image/png');
      };
  };
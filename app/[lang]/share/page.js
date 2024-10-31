'use client'

const ShareButton = () => {
    const handleShare = async () => {
      if (navigator.share) {
        try {
          await navigator.share({
            title: 'Check out this awesome website!',
            text: 'Here’s a website I found useful',
            url: window.location.href,
          });
          console.log('Content shared successfully');
        } catch (error) {
          console.error('Error sharing:', error);
        }
      } else {
        alert('Sharing is not supported on this device');
      }
    };
  
    return (
      <button onClick={handleShare} className="share-button">
        Share
      </button>
    );
  };
  
  export default ShareButton;
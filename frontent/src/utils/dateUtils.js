export const formatDateDivider = (timestamp) => {
  const messageDate = new Date(timestamp);
  const today = new Date();
  const yesterday = new Date();
  
  // Reset all dates to midnight to safely compare just the "Day"
  messageDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  yesterday.setHours(0, 0, 0, 0);
  yesterday.setDate(today.getDate() - 1);

  if (messageDate.getTime() === today.getTime()) {
    return "TODAY";
  } else if (messageDate.getTime() === yesterday.getTime()) {
    return "YESTERDAY";
  } else {
    // For older dates, show the full date (e.g., "June 20, 2024")
    return messageDate.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
  }
};
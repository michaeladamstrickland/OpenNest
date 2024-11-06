// src/data/ChatbotResponses.js

const ChatbotResponses = {
  preApproval: {
    checkApproval: (user) => `Your current pre-approval limit is $${user.preApproval}. For more assistance, please contact your lender.`,
    increaseApprovalTips: "To increase your pre-approval limit, consider discussing with your lender about your income, assets, and credit score. They may re-evaluate your approval amount.",
    documentationNeeded: "Typically, increasing your pre-approval might require additional documents, such as recent pay stubs, bank statements, or tax returns.",
    lenderRecommendations: "If you're looking for lenders, we have a list of recommended lenders experienced in our region. Just let me know if you’re interested.",
  },
  tourScheduling: {
    scheduleTour: (type) => {
      if (type === 'in-person') {
        return "For an in-person tour, please select your preferred date and time. Our available slots are displayed on the property page.";
      }
      return "For a virtual tour, please check that your device supports AR/VR. We’ll provide instructions to get started.";
    },
    virtualTourInstructions: "For the best experience, ensure you have an AR/VR-compatible device. Virtual tours allow a 360-degree view of the property.",
    tourReminder: "Once a tour is scheduled, you’ll receive a confirmation and a reminder 24 hours before your tour.",
    cancelTour: "Need to cancel or reschedule? Visit your dashboard and select the property tour to update your booking.",
  },
  offers: {
    submitOfferStep1: "Let’s start by entering the offer amount you’d like to make.",
    submitOfferStep2: "Would you like to add any notes for the seller? You can specify any terms or conditions here.",
    negotiatingTips: "When negotiating, research recent property sales in the area. This can help you make a competitive offer while staying within your budget.",
    offerSubmitted: (amount) => `Your offer of $${amount} has been submitted successfully! The seller will review it, and you’ll be notified of any updates.`,
    offerStatusCheck: "To check the status of your offer, visit your dashboard or let me know, and I’ll pull up the latest updates.",
  },
  general: {
    propertyDetails: "You can view each property’s details by selecting the listing. This includes pricing, location, amenities, and neighborhood insights.",
    propertyPriceRange: "Our properties range in price from $300,000 to $1.5 million. Use the filters to set your preferred budget range.",
    petFriendly: "Yes, some properties are pet-friendly. Look for the 'pet-friendly' label on the listing to confirm!",
    locationOptions: "Properties are available in areas like Princeton, Cherry Hill, and Hoboken, among others. You can search by city or filter by location.",
    schoolRatings: "If you're interested in school ratings, I can provide the ratings for schools near any property. Just ask!",
    neighborhoodSafety: "I can share general safety ratings for most neighborhoods. This info is typically based on local crime statistics and community insights.",
    unknown: "I'm here to help! Could you clarify your question, or try a different topic?",
    liveAgent: "If you’d like to speak with a live agent, click 'Contact a Live Agent' for assistance.",
  },
  buyingProcess: {
    buyingSteps: "The buying process involves getting pre-approved, searching for properties, making offers, negotiating terms, and closing. I can guide you through each stage!",
    afterOfferAccepted: "After your offer is accepted, there will be a home inspection, final mortgage arrangements, and preparation for closing day.",
    inspectionTips: "During inspection, ask about any repairs and note them in your final agreement. A thorough inspection can help prevent future surprises.",
    closingPreparation: "Closing involves signing documents, transferring funds, and completing ownership transfer. On this day, you’ll receive the keys to your new home!",
    closingDayChecklist: "Before closing, ensure you have your ID, cashier’s check (if required), and any final documents from your lender.",
    legalRequirements: "The legal requirements at closing vary by state. Our team will ensure all necessary steps are covered for a smooth transfer of ownership.",
  },
  techSupport: {
    accountHelp: "Having trouble logging in or accessing your account? Try resetting your password or contact our support team for assistance.",
    settingUpSmartLock: "Our tech team can set up the smart lock and security cameras. Schedule an appointment, and we’ll take care of the setup!",
    troubleshootingSmartLock: "If the smart lock isn't responding, try resetting it. Make sure your mobile device is within range. If issues persist, contact our support.",
    cameraInstallationGuide: "For a camera setup guide, visit your dashboard under 'Tech Setup'. You’ll find step-by-step instructions there.",
    contactSupport: "If you’re experiencing technical issues, please contact support for immediate help.",
  },
};

export default ChatbotResponses;

  
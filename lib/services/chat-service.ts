// Mock responses for demonstration
const mockResponses = {
  foundation: {
    content:
      "The main building utilizes a reinforced concrete slab foundation with a minimum thickness of 150mm. The concrete mix is specified as C30/37 with water-resistant additives. Steel reinforcement consists of 12mm diameter rebar in a 200mm grid pattern. The foundation includes a 50mm blinding layer and a DPM (damp proof membrane) of 1200-gauge polythene. Foundation depth is 1.2m below ground level to ensure stability on the clay soil conditions.",
    source: "Foundation Design Document",
    page: 12,
  },
  insulation: {
    content:
      "Exterior walls feature a multi-layer insulation system consisting of 100mm rigid polyisocyanurate (PIR) boards with a thermal conductivity of 0.022 W/mK, providing a U-value of 0.18 W/m²K. The insulation is installed between the external brick cladding and the internal concrete block wall with a 50mm cavity. All joints are sealed with aluminum tape to prevent thermal bridging. The system exceeds the minimum requirements specified in Building Regulations Part L.",
    source: "Wall Construction Specifications",
    page: 24,
  },
  electrical: {
    content:
      "Yes, the electrical system complies with the 18th Edition of the IEE Wiring Regulations (BS 7671:2018+A1:2020). The system includes RCD protection for all circuits, with 30mA trip sensitivity for socket outlets and 100mA for lighting circuits. All consumer units feature metal enclosures with surge protection devices (SPDs). The installation requires certification by a qualified electrician registered with a competent person scheme such as NICEIC or ELECSA, with test results documented in an Electrical Installation Certificate (EIC).",
    source: "Electrical Systems Compliance Report",
    page: 8,
  },
  fire: {
    content:
      "The building incorporates a comprehensive fire safety system in compliance with Building Regulations Part B. This includes fire-resistant compartmentation with 60-minute fire-rated walls and floors between different usage areas. Fire doors with 30-minute resistance (FD30) are installed at strategic locations. The automatic fire detection system consists of optical smoke detectors in corridors and heat detectors in kitchens, connected to a central addressable control panel. Sprinkler systems are installed throughout with a water flow rate of 2.25 mm/min as per BS EN 12845. Emergency lighting provides 3-hour backup and illuminates all escape routes.",
    source: "Fire Safety Strategy Document",
    page: 15,
  },
  roof: {
    content:
      "The roof structure consists of prefabricated timber trusses at 600mm centers, designed to support a total load of 1.5 kN/m² including snow loading. Trusses are manufactured from C24 grade timber with galvanized steel connector plates. The roof covering comprises concrete interlocking tiles with a minimum pitch of 22.5°. Ventilation is provided by 25mm continuous eaves vents and ridge vents, delivering an airflow equivalent to 5000mm²/m. The roof includes a breathable membrane underlay with a vapor resistance of less than 0.25 MNs/g.",
    source: "Roof Construction Details",
    page: 7,
  },
  ventilation: {
    content:
      "The building employs a mechanical ventilation with heat recovery (MVHR) system providing whole-house ventilation. The system delivers 0.5 air changes per hour under normal conditions, increasing to 4 air changes per hour in kitchens and bathrooms during peak usage. The MVHR unit has a heat recovery efficiency of 90% and specific fan power less than 0.7 W/(l/s).",
    source: "Ventilation System Specifications",
    page: 31,
  },
}

// Function to get a mock response based on the query
export const getMockResponse = (query: string) => {
  const normalizedQuery = query.toLowerCase()

  if (normalizedQuery.includes("foundation")) {
    return mockResponses.foundation
  } else if (normalizedQuery.includes("insulation") || normalizedQuery.includes("wall")) {
    return mockResponses.insulation
  } else if (normalizedQuery.includes("electrical") || normalizedQuery.includes("wiring")) {
    return mockResponses.electrical
  } else if (normalizedQuery.includes("fire") || normalizedQuery.includes("safety")) {
    return mockResponses.fire
  } else if (normalizedQuery.includes("roof")) {
    return mockResponses.roof
  } else if (normalizedQuery.includes("ventilation")) {
    return mockResponses.ventilation
  } else {
    // Default response
    return {
      content:
        "I found information related to your query in our building plans documentation. The specifications indicate compliance with all relevant building regulations and industry standards. Please let me know if you need more specific details about any aspect of the building design.",
      source: "Building Plan Documentation",
      page: 1,
    }
  }
}

// Mock chat history data
export const chatHistory = [
  {
    id: "chat-1",
    title: "Foundation specifications inquiry",
    timestamp: new Date(2023, 5, 15, 14, 30),
    preview: "Discussion about concrete slab foundation requirements",
    messages: [
      {
        id: "msg-1",
        role: "user",
        content: "What are the foundation specifications for the main building?",
      },
      {
        id: "msg-2",
        role: "assistant",
        content: `${mockResponses.foundation.content}\n\nSource: ${mockResponses.foundation.source}, Page: ${mockResponses.foundation.page}`,
      },
    ],
  },
  {
    id: "chat-2",
    title: "Electrical compliance questions",
    timestamp: new Date(2023, 5, 14, 10, 15),
    preview: "Review of IEE Wiring Regulations compliance",
    messages: [
      {
        id: "msg-1",
        role: "user",
        content: "Does the electrical system comply with current safety regulations?",
      },
      {
        id: "msg-2",
        role: "assistant",
        content: `${mockResponses.electrical.content}\n\nSource: ${mockResponses.electrical.source}, Page: ${mockResponses.electrical.page}`,
      },
      {
        id: "msg-3",
        role: "user",
        content: "What about surge protection?",
      },
      {
        id: "msg-4",
        role: "assistant",
        content:
          "The electrical system includes surge protection devices (SPDs) in all consumer units as required by the 18th Edition of the IEE Wiring Regulations. These SPDs are Type 2 devices designed to protect against induced surges from lightning strikes and switching operations. They have a maximum discharge current of 40kA and a response time of less than 25 nanoseconds.\n\nSource: Electrical Systems Compliance Report, Page: 12",
      },
    ],
  },
  {
    id: "chat-3",
    title: "Fire safety provisions",
    timestamp: new Date(2023, 5, 12, 9, 45),
    preview: "Questions about fire-rated walls and detection systems",
    messages: [
      {
        id: "msg-1",
        role: "user",
        content: "What are the fire safety provisions for the building?",
      },
      {
        id: "msg-2",
        role: "assistant",
        content: `${mockResponses.fire.content}\n\nSource: ${mockResponses.fire.source}, Page: ${mockResponses.fire.page}`,
      },
    ],
  },
  {
    id: "chat-4",
    title: "Roof structure specifications",
    timestamp: new Date(2023, 5, 10, 16, 20),
    preview: "Details about timber trusses and roof loading",
    messages: [
      {
        id: "msg-1",
        role: "user",
        content: "What are the specifications for the roof structure?",
      },
      {
        id: "msg-2",
        role: "assistant",
        content: `${mockResponses.roof.content}\n\nSource: ${mockResponses.roof.source}, Page: ${mockResponses.roof.page}`,
      },
    ],
  },
  {
    id: "chat-5",
    title: "Ventilation system inquiry",
    timestamp: new Date(2023, 5, 5, 13, 45),
    preview: "MVHR system specifications and requirements",
    messages: [
      {
        id: "msg-1",
        role: "user",
        content: "What are the ventilation requirements for the building?",
      },
      {
        id: "msg-2",
        role: "assistant",
        content: `${mockResponses.ventilation.content}\n\nSource: ${mockResponses.ventilation.source}, Page: ${mockResponses.ventilation.page}`,
      },
    ],
  },
]

// Function to fetch chat by ID
export const fetchChatById = async (chatId: string) => {
  // In a real application, this would fetch from an API or database
  // For now, we'll simulate a delay and return mock data
  await new Promise((resolve) => setTimeout(resolve, 800))

  const chat = chatHistory.find((c) => c.id === chatId)

  if (!chat) {
    throw new Error(`Chat with ID ${chatId} not found`)
  }

  return chat
}

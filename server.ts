import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'Verdant Coast Florida Landscaping' });
});

// AI Chatbot endpoint for Florida Landscaping consultation
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
      try {
        const ai = new GoogleGenAI({ apiKey });
        const systemPrompt = `You are "Verdant AI", the expert Florida Luxury Landscaping & Outdoor Living assistant for Verdant Coast Florida. 
Your goal is to assist homeowners, estate managers, commercial developers, and HOAs across Florida (Miami, Palm Beach, Naples, Tampa, Orlando, Sarasota, Boca Raton, Fort Lauderdale).
Provide knowledgeable, concise, ultra-professional advice regarding:
- Florida native flora (Royal Palms, Foxtail Palms, Bismarck Palms, Bougainvillea, Clusia hedges, St. Augustine vs Zoysia grass).
- High-end outdoor living: travertine hardscaping, pergola design, fire features, outdoor kitchens, low-voltage LED landscape lighting.
- Florida climate considerations: hurricane resistance, salt tolerance for coastal properties, smart Wi-Fi drip irrigation, pest and fungus control.
- Free estimate scheduling & custom pricing guidelines.

Keep answers warm, luxury-focused, polite, and under 3-4 paragraphs. Always offer to help schedule a free 3D design consultation or instant estimate.`;

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: [
            { role: 'user', parts: [{ text: `${systemPrompt}\n\nUser Question: ${message}` }] }
          ]
        });

        const replyText = response.text || "Thank you for reaching out to Verdant Coast. How can our Florida landscaping design team assist you with your estate project today?";
        return res.json({ reply: replyText });
      } catch (geminiError) {
        console.warn('Gemini API call failed, using intelligent fallback response:', geminiError);
      }
    }

    // Intelligent Fallback response if API key is not configured or fails
    const lowerMsg = message.toLowerCase();
    let fallbackReply = "Thank you for contacting Verdant Coast Florida. We specialize in luxury estate landscaping, smart irrigation, travertine hardscaping, and architectural night lighting. Would you like to schedule a free 3D design consultation or get an instant quote estimate?";

    if (lowerMsg.includes('grass') || lowerMsg.includes('lawn') || lowerMsg.includes('sod') || lowerMsg.includes('zoysia') || lowerMsg.includes('augustine')) {
      fallbackReply = "In Florida's humid climate, we highly recommend Empire Turf Zoysia for lush texture and shade tolerance, or Floratam St. Augustine for thick emerald coverage. We provide complete soil conditioning, grading, and automated drip irrigation for lasting health.";
    } else if (lowerMsg.includes('palm') || lowerMsg.includes('tree') || lowerMsg.includes('plant')) {
      fallbackReply = "For Florida luxury estates, we frequently specify majestic Royal Palms for driveways, Bismarck Palms for bold blue accent foliage, and privacy Clusia hedges. All species are selected for salt-tolerance, wind-resistance, and year-round Florida vibrancy.";
    } else if (lowerMsg.includes('lighting') || lowerMsg.includes('light') || lowerMsg.includes('night')) {
      fallbackReply = "Our architectural outdoor lighting uses brass low-voltage LED fixtures (2700K warm white) to highlight palm canopy architecture, travertine pathways, and poolside features with smart smartphone control and sunset timers.";
    } else if (lowerMsg.includes('quote') || lowerMsg.includes('price') || lowerMsg.includes('cost') || lowerMsg.includes('estimate')) {
      fallbackReply = "Our Florida estate transformations range from targeted hardscape & lighting packages ($5,000–$25,000) to full multi-acre luxury outdoor living resorts ($50,000+). You can use our interactive Estimate Calculator above or fill out our contact form for an itemized proposal!";
    } else if (lowerMsg.includes('irrigation') || lowerMsg.includes('water') || lowerMsg.includes('sprinkler')) {
      fallbackReply = "We engineer smart Wi-Fi irrigation systems with weather-sensing rain gauges and precision micro-drip lines. This reduces water usage by up to 40% while keeping your turf and exotic flora perfectly hydrated year-round.";
    }

    return res.json({ reply: fallbackReply });
  } catch (error) {
    console.error('Server error in /api/chat:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Instant Estimate Endpoint
app.post('/api/estimate', (req, res) => {
  const { propertyType, propertySize, services, city } = req.body;
  let baseCost = 2500;
  
  if (propertyType === 'commercial') baseCost *= 1.8;
  if (propertyType === 'hoa') baseCost *= 2.5;
  if (propertyType === 'estate') baseCost *= 2.0;

  const sqft = Number(propertySize) || 2500;
  const sqftRate = 1.2;
  let estimatedTotal = baseCost + (sqft * sqftRate);

  const selectedServicesList = Array.isArray(services) ? services : [];
  if (selectedServicesList.includes('landscape_design')) estimatedTotal += 1500;
  if (selectedServicesList.includes('hardscaping')) estimatedTotal += 4500;
  if (selectedServicesList.includes('lighting')) estimatedTotal += 2200;
  if (selectedServicesList.includes('irrigation')) estimatedTotal += 1800;
  if (selectedServicesList.includes('tree_care')) estimatedTotal += 1200;
  if (selectedServicesList.includes('sod')) estimatedTotal += 2800;

  const minRange = Math.round(estimatedTotal * 0.9);
  const maxRange = Math.round(estimatedTotal * 1.15);

  res.json({
    propertySize: sqft,
    city: city || 'Florida',
    estimatedMin: minRange,
    estimatedMax: maxRange,
    estimatedDays: Math.max(2, Math.ceil(sqft / 1500) + selectedServicesList.length),
    itemizedBreakdown: selectedServicesList
  });
});

// Contact Form Endpoint
app.post('/api/contact', (req, res) => {
  const { name, email, phone, city, serviceNeeded } = req.body;
  const confirmationCode = 'VC-FL-' + Math.floor(100000 + Math.random() * 900000);
  
  res.json({
    success: true,
    confirmationCode,
    message: `Thank you, ${name || 'valued client'}! Your request for ${serviceNeeded || 'Florida Landscaping'} in ${city || 'Florida'} has been received. A senior design consultant will contact you within 2 hours.`,
    nextConsultationSlot: 'Tomorrow at 10:00 AM EST'
  });
});

// Vite Middleware for development
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Verdant Coast Florida Server running on http://localhost:${PORT}`);
  });
}

startServer();

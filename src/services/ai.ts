const EMERGENCY_KEYWORDS = [
  "chest pain",
  "difficulty breathing",
  "severe bleeding",
  "stroke",
  "heart attack",
  "unconscious",
  "not breathing",
  "severe allergic reaction",
  "anaphylaxis",
  "suicidal",
  "overdose",
  "severe burn",
  "broken bone",
  "head injury",
  "seizure",
  "poisoning",
];

const HEALTH_RESPONSES: Record<string, string> = {
  headache: `# Headaches

Headaches are very common and can have many causes. Here are some common types:

## Tension Headaches
- Most common type
- Often caused by stress, poor posture, or eye strain
- Feel like a tight band around your head

## Migraines
- Severe, throbbing pain, often on one side
- May include nausea, sensitivity to light/sound
- Can last from a few hours to several days

## When to See a Doctor
- Sudden, severe headache ("thunderclap")
- Headache after head injury
- Headache with fever, stiff neck, confusion
- New headache pattern after age 50

**Disclaimer:** This is general information only. Please consult a healthcare professional for proper diagnosis and treatment.`,

  sleep: `# Improving Sleep Quality

Good sleep is essential for overall health. Here are evidence-based tips:

## Sleep Hygiene
1. **Consistent Schedule** - Go to bed and wake up at the same time daily
2. **Dark Environment** - Use blackout curtains or eye mask
3. **Cool Temperature** - Keep bedroom between 60-67°F (15-19°C)
4. **Limit Screen Time** - Avoid screens 1 hour before bed
5. **Avoid Caffeine** - No caffeine after 2 PM

## Relaxation Techniques
- Deep breathing exercises
- Progressive muscle relaxation
- Meditation or mindfulness
- Reading a physical book

## When to Seek Help
- Insomnia lasting more than a few weeks
- Loud snoring with gasping (possible sleep apnea)
- Daytime sleepiness affecting daily life

**Disclaimer:** This is general wellness information. Consult a sleep specialist for persistent sleep issues.`,

  dehydration: `# Dehydration

Dehydration occurs when your body loses more fluids than it takes in.

## Common Signs
- Thirst
- Dark yellow urine
- Fatigue or dizziness
- Dry mouth and lips
- Reduced urination

## Prevention Tips
1. **Drink regularly** - Don't wait until you're thirsty
2. **Monitor intake** - Aim for 8 glasses (about 2 liters) daily
3. **Increase during activity** - Drink more when exercising or in hot weather
4. **Eat water-rich foods** - Fruits like watermelon, cucumber

## When to Seek Medical Attention
- Severe dizziness or confusion
- Very dark urine or no urination for 8+ hours
- Rapid heartbeat or breathing
- Sunken eyes (in children)

**Disclaimer:** This is educational information. Seek immediate medical care for severe dehydration symptoms.`,

  "blood pressure": `# Understanding Blood Pressure

Blood pressure measures the force of blood against artery walls.

## The Numbers
- **Systolic (top number)**: Pressure when heart beats
- **Diastolic (bottom number)**: Pressure when heart rests
- **Normal**: Less than 120/80 mmHg
- **Elevated**: 120-129 / less than 80
- **High (Hypertension)**: 130+ / 80+

## Risk Factors
- Family history
- Age (risk increases with age)
- High sodium diet
- Lack of exercise
- Obesity
- Smoking
- Excessive alcohol

## Management
- Regular exercise (150 min/week)
- DASH diet (fruits, vegetables, whole grains)
- Limit sodium to under 2,300mg/day
- Maintain healthy weight
- Limit alcohol
- Manage stress

**Disclaimer:** This is educational information. Regular check-ups with your doctor are essential for blood pressure management.`,

  water: `# Daily Water Intake

Water is essential for every function in your body.

## General Guidelines
- **Men**: About 3.7 liters (15.5 cups) daily
- **Women**: About 2.7 liters (11.5 cups) daily
- This includes water from food (about 20%)

## Factors That Increase Needs
- Exercise or physical activity
- Hot/humid weather
- Illness (fever, vomiting, diarrhea)
- Pregnancy or breastfeeding

## Tips to Stay Hydrated
1. Keep a water bottle with you
2. Drink a glass before each meal
3. Set reminders if you forget
4. Eat water-rich foods
5. Monitor urine color (light yellow is good)

**Disclaimer:** Individual needs vary. Consult your healthcare provider for personalized hydration advice.`,
};

export function detectEmergency(message: string): boolean {
  const lowerMessage = message.toLowerCase();
  return EMERGENCY_KEYWORDS.some((keyword) => lowerMessage.includes(keyword));
}

export function getEmergencyResponse(): string {
  return `🚨 **EMERGENCY ALERT**

If you are experiencing a medical emergency, please:

1. **Call emergency services immediately** (911 in the US)
2. **Do not wait** for online advice for serious symptoms
3. **Go to the nearest emergency room** if safe to do so

**Symptoms requiring immediate attention:**
- Chest pain or pressure
- Difficulty breathing
- Severe bleeding
- Signs of stroke (face drooping, arm weakness, speech difficulty)
- Severe allergic reaction
- Loss of consciousness

**This AI assistant cannot provide emergency medical care. Please seek professional help immediately.**`;
}

export function getHealthResponse(message: string): string {
  const lowerMessage = message.toLowerCase();

  for (const [keyword, response] of Object.entries(HEALTH_RESPONSES)) {
    if (lowerMessage.includes(keyword)) {
      return response;
    }
  }

  return `Thank you for your question. While I can provide general health information, I'm not a licensed medical professional.

Here's what I can help with:
- General wellness and lifestyle advice
- Explaining medical concepts in simple terms
- Educational health information
- Tips for healthy living

**Important reminders:**
- I cannot diagnose conditions or prescribe treatments
- Always consult a healthcare professional for medical advice
- Seek emergency care for urgent symptoms
- This information is for educational purposes only

Could you tell me more about what specific health topic you'd like to learn about?`;
}

export async function sendMessage(message: string): Promise<string> {
  // Simulate API delay
  await new Promise((resolve) =>
    setTimeout(resolve, 1000 + Math.random() * 1000),
  );

  if (detectEmergency(message)) {
    return getEmergencyResponse();
  }

  return getHealthResponse(message);
}

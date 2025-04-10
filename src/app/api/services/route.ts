import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const services = [
    "General Checkup",
    "Specialist Consultation",
    "Diagnostic Tests",
    "Vaccination",
  ];
  res.status(200).json({ services });
}
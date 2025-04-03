import { config } from 'dotenv';
config({ path: '.env.local' });
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import connectToDatabase from '../src/lib/mongodb.ts';
import Hospital from '../src/models/Hospital.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function importHospitals() {
    try {
        await connectToDatabase();
        console.log('Connected to MongoDB');

        const jsonFilePath = path.join(__dirname, '../data/hospitals/health.json');
        console.log('Looking for file:', jsonFilePath);
        const fileData = fs.readFileSync(jsonFilePath, 'utf8');
        const cpdData = JSON.parse(fileData);

        const institutions = cpdData.cpd_provider_institutions || [];
        const privateProviders = cpdData.cpd_providers_private || [];
        const hospitalsArray = [...institutions, ...privateProviders];
        console.log('Found entries:', hospitalsArray.length);

        const transformedHospitals = hospitalsArray.map((provider: any) => {
            const phone = Array.isArray(provider.phone)
                ? provider.phone.join(', ')
                : provider.phone || 'No phone provided';
            const email = Array.isArray(provider.email)
                ? provider.email
                : [provider.email || 'No email provided']; // Ensure email is an array

            return {
                name: provider.name || 'Unknown',
                address: 'No address provided',
                phone: phone,
                email: email,
                city: provider.location || 'Unknown',
                region: 'Unknown',
                description: '',
                specializations: [],
                coordinates: [],
                functionalStatus: 'Unknown',
            };
        });
        console.log('Transformed hospitals:', transformedHospitals.length);

        if (transformedHospitals.length > 0) {
            await Hospital.deleteMany({});
            console.log('Cleared existing hospital data');
            await Hospital.insertMany(transformedHospitals);
            console.log(`Imported ${transformedHospitals.length} hospitals from health.json`);
        }

        console.log(`Total hospitals imported: ${transformedHospitals.length}`);
        process.exit(0);
    } catch (error) {
        console.error('Error importing hospitals:', error);
        process.exit(1);
    }
}

importHospitals();
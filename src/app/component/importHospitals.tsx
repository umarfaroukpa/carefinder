import fs from 'fs';
import path from 'path';
import connectToDatabase from '../../lib/mongodb';
import Hospital from '../../models/Hospital';

async function importHospitals() {
    try {
        // Connect to MongoDB
        await connectToDatabase();
        console.log('Connected to MongoDB');

        // Path to your JSON folder
        const jsonFolderPath = path.join(process.cwd(), 'data', 'hospitals');

        // Read all JSON files in the folder
        const files = fs.readdirSync(jsonFolderPath).filter(file => file.endsWith('.json'));

        let totalImported = 0;

        for (const file of files) {
            const filePath = path.join(jsonFolderPath, file);
            const fileData = fs.readFileSync(filePath, 'utf8');
            const hospitals = JSON.parse(fileData);

            // Check if data is an array or object
            const hospitalsArray = Array.isArray(hospitals) ? hospitals : [hospitals];

            // Transform data to match your schema if needed
            const transformedHospitals = hospitalsArray.map(hospital => ({
                name: hospital.name || 'Unknown',
                address: hospital.address || 'No address provided',
                phone: hospital.contactNumber || hospital.phone || 'No phone provided',
                email: hospital.email || 'No email provided',
                city: hospital.city || hospital.location?.split(',')[0] || 'Unknown',
                region: hospital.region || hospital.location?.split(',')[1]?.trim() || 'Unknown',
                description: hospital.description || '',
                // Add any additional fields from your JSON that you want to include
                specializations: hospital.specializations || []
            }));

            // Insert data into MongoDB
            if (transformedHospitals.length > 0) {
                await Hospital.insertMany(transformedHospitals);
                console.log(`Imported ${transformedHospitals.length} hospitals from ${file}`);
                totalImported += transformedHospitals.length;
            }
        }

        console.log(`Total hospitals imported: ${totalImported}`);
        process.exit(0);
    } catch (error) {
        console.error('Error importing hospitals:', error);
        process.exit(1);
    }
}

importHospitals();
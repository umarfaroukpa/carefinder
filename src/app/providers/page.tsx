"use client"

import React, { useState } from 'react';
import { MapPin, Phone, Mail, Search, X } from 'lucide-react';
import Link from 'next/link';

// Define the hospital type interface
interface Hospital {
    sno: number;
    name: string;
    location: string | null;
    phone: string | string[] | null;
    email: string | null;
}

const Providers = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchLocation, setSearchLocation] = useState('');

    // Combined hospital data from both documents
    const hospitals: Hospital[] = [


        {
            "sno": 1,
            "name": "Jos University Teaching Hospital",
            "location": "Jos",
            "phone": "07-3454376",
            "email": "juth-info@yahoo.com"
        },
        {
            "sno": 2,
            "name": "Ebonyi State University Teaching Hospital",
            "location": "Abakaliki",
            "phone": "043-221882",
            "email": "info@ebsuth.org"
        },
        {
            "sno": 3,
            "name": "University of Calabar Teaching Hospital",
            "location": "Calabar",
            "phone": "087238513",
            "email": null
        },
        {
            "sno": 4,
            "name": "University of Port Harcourt Teaching Hospital",
            "location": "Port Harcourt",
            "phone": "08033122701",
            "email": "dr_etawo@yahoo.com"
        },
        {
            "sno": 5,
            "name": "Lagos State University Teaching Hospital",
            "location": "Lagos",
            "phone": "014710670",
            "email": "cmd@lasuth.org"
        },
        {
            "sno": 6,
            "name": "College of Medicine, University of Ibadan",
            "location": "Ibadan",
            "phone": "02-8708396",
            "email": "provost@comui.edu.ng"
        },
        {
            "sno": 7,
            "name": "Federal Medical Centre",
            "location": "Owerri",
            "phone": "08033411575",
            "email": "fmcowerri@yahoo.com"
        },
        {
            "sno": 8,
            "name": "University of Uyo Teaching Hospital",
            "location": "Uyo",
            "phone": "08087774730",
            "email": null
        },
        {
            "sno": 9,
            "name": "Olabisi Onabanjo University Teaching Hospital",
            "location": "Sagamu",
            "phone": "037-640916",
            "email": "cmd.oouth@ogunstate.gov.ng"
        },
        {
            "sno": 10,
            "name": "Health and Human Services Hospital Management Board",
            "location": "Abuja",
            "phone": "08050997403",
            "email": "cpdasokoro@gmail.com"
        },
        {
            "sno": 11,
            "name": "Irrua Specialist Teaching Hospital",
            "location": "Irrua-Edo",
            "phone": "08058065577",
            "email": "irruateachhosp@yahoo.com"
        },
        {
            "sno": 12,
            "name": "National Postgraduate College of Nigeria",
            "location": "Lagos",
            "phone": "01-8970944",
            "email": "enquiry@npmcn.edu.ng"
        },
        {
            "sno": 13,
            "name": "Imo State University Teaching Hospital",
            "location": "Imo",
            "phone": "083-520194",
            "email": "imsuthorlu@yahoo.com"
        },
        {
            "sno": 14,
            "name": "Obafemi Awolowo University",
            "location": "Ile-Ife",
            "phone": "+2348034090243",
            "email": "sologuniyi@yahoo.com"
        },
        {
            "sno": 15,
            "name": "Delta State Hospital Management Board",
            "location": "Asaba",
            "phone": "08077791001",
            "email": null
        },
        {
            "sno": 16,
            "name": "University of Abuja Teaching Hospital",
            "location": "Gwagwalada",
            "phone": "09-2905535",
            "email": "pitalabi@gmail.com"
        },
        {
            "sno": 17,
            "name": "Guild of Medical Directors",
            "location": "Abuja",
            "phone": "08057777123",
            "email": null
        },
        {
            "sno": 18,
            "name": "Federal Medical Centre",
            "location": "Asaba",
            "phone": null,
            "email": null
        },
        {
            "sno": 19,
            "name": "Lagos State Health Service Commission",
            "location": "Lagos",
            "phone": "01-8923056",
            "email": "hsc@lagosstate.gov.ng"
        },
        {
            "sno": 20,
            "name": "Obafemi Awolowo University Teaching Hospital Complex",
            "location": "Ile-Ife",
            "phone": "036-230271-2",
            "email": "oauthc-ile-ife@yahoo.com"
        },
        {
            "sno": 21,
            "name": "Abia State University Teaching Hospital",
            "location": "Aba",
            "phone": "082-232776",
            "email": null
        },
        {
            "sno": 22,
            "name": "University College Hospital",
            "location": "Ibadan",
            "phone": "08033230882",
            "email": "cmac@uch-ibadan.org"
        },
        {
            "sno": 23,
            "name": "State House Medical Centre",
            "location": "Abuja",
            "phone": "09-6252595",
            "email": "cmacsoffice@gmail.com"
        },
        {
            "sno": 24,
            "name": "University of Nigeria",
            "location": "Enugu",
            "phone": "08033227339",
            "email": "provost.collegeofmedicine@unn.edu.ng"
        },
        {
            "sno": 25,
            "name": "International Academy of Pathology, West African Division",
            "location": null,
            "phone": "+2348057791888",
            "email": "awadiap@yahoo.com"
        },
        {
            "sno": 26,
            "name": "Federal Medical Centre, Keffi",
            "location": "Nassarawa State",
            "phone": "08059899009",
            "email": "info@fmckeffi.net"
        },
        {
            "sno": 27,
            "name": "Nigerian Medical Association",
            "location": null,
            "phone": "08055272702",
            "email": "lagosnma@hotmail.com"
        },
        {
            "sno": 28,
            "name": "Society of Family Physicians of Nigeria",
            "location": "Lagos",
            "phone": "01-4700442",
            "email": "sofpon-ng@yahoo.com"
        },
        {
            "sno": 29,
            "name": "Federal Medical Centre",
            "location": "Umuahia",
            "phone": "07062141227",
            "email": "abalichuku@yahoo.com"
        },
        {
            "sno": 30,
            "name": "Medical Women Association of Nigeria, Lagos Branch",
            "location": "Lagos",
            "phone": "08029293013",
            "email": "mwanlagos@yahoo.com"
        },
        {
            "sno": 31,
            "name": "University of Ilorin Teaching Hospital",
            "location": "Ilorin",
            "phone": "08055763942",
            "email": "uithilorin1980@yahoo.com"
        },
        {
            "sno": 32,
            "name": "Ophthalmology Society of Nigeria",
            "location": null,
            "phone": "08033084308",
            "email": "osnigeria@yahoo.com"
        },
        {
            "sno": 33,
            "name": "Medical Association of Nigeria Across Britain",
            "location": null,
            "phone": "+44(0)7951490373",
            "email": "secretary@mansag.org"
        },
        {
            "sno": 34,
            "name": "Paediatric Association of Nigeria",
            "location": null,
            "phone": [
                "07037850012",
                "08037129979"
            ],
            "email": "pan.nigeria@gmail.com"
        },
        {
            "sno": 35,
            "name": "Association of Public Health Physicians of Nigeria",
            "location": null,
            "phone": "08023381084",
            "email": "aphpn@yahoo.com"
        },
        {
            "sno": 36,
            "name": "Aminu Kano Teaching Hospital",
            "location": "Kano",
            "phone": "08057203511",
            "email": "akthkano@yahoo.com"
        },
        {
            "sno": 37,
            "name": "College of Health Sciences, Bingham University",
            "location": "Nassarawa",
            "phone": "08065539634",
            "email": "binghamuniversity2005@yahoo.com"
        },
        {
            "sno": 38,
            "name": "National Hospital, Abuja",
            "location": "Abuja",
            "phone": "09-290886",
            "email": "infor@nationalhospitalabuja.net"
        },
        {
            "sno": 39,
            "name": "Medical and Dental Consultants Association of Nigeria",
            "location": null,
            "phone": "08037147245",
            "email": "drudofia@gmail.com"
        },
        {
            "sno": 40,
            "name": "Federal Medical Centre, Makurdi",
            "location": "Makurdi",
            "phone": "08069790184",
            "email": "fmcmkd@yahoo.com"
        },
        {
            "sno": 41,
            "name": "Association of Psychiatrists in Nigeria",
            "location": null,
            "phone": "08037147245",
            "email": "victorlash@yahoo.com"
        },
        {
            "sno": 42,
            "name": "College of Health Sciences, Oshogbo",
            "location": "Oshogbo",
            "phone": "08023277739",
            "email": "uniosuncpd@gmail.com"
        },
        {
            "sno": 43,
            "name": "Christian Medical and Dental Association of Nigeria",
            "location": "Abuja",
            "phone": "08035501261",
            "email": "cmdanigeria@yahoo.com"
        },
        {
            "sno": 44,
            "name": "Psychiatric Hospital Uselu",
            "location": "Benin",
            "phone": "08032331189",
            "email": "psyuselu@yahoo.com"
        },
        {
            "sno": 45,
            "name": "Lagos University Teaching Hospital, Idi-Araba, Surulere",
            "location": "Lagos",
            "phone": "01-8713961",
            "email": null
        },
        {
            "sno": 46,
            "name": "College of Health Sciences, University of Uyo",
            "location": "Uyo",
            "phone": "08035515388",
            "email": "pekwere@hotmail.com"
        },
        {
            "sno": 47,
            "name": "National Tuberculosis and Leprosy Training Centre, Zaria",
            "location": "Kaduna",
            "phone": "069-875871",
            "email": "ntbltc@yahoo.com"
        },
        {
            "sno": 48,
            "name": "Military Hospital Ikoyi",
            "location": "Lagos",
            "phone": "08191431787",
            "email": "mhl.lagos@yahoo.com"
        },
        {
            "sno": 49,
            "name": "Medical and Dental Consultants Association of Nigeria",
            "location": "Nnewi",
            "phone": "08056382061",
            "email": null
        },
        {
            "sno": 50,
            "name": "Association of General and Private Medical Practitioners of Nigeria",
            "location": "Lagos",
            "phone": "08032414323",
            "email": null
        },
        {
            "sno": 51,
            "name": "Wuse General Hospital, Abuja",
            "location": "Abuja",
            "phone": "08035755992",
            "email": null
        },
        {
            "sno": 52,
            "name": "Asokoro District Hospital",
            "location": "Abuja",
            "phone": "08050997403",
            "email": null
        },
        {
            "sno": 53,
            "name": "Maitama District Hospital",
            "location": "Abuja",
            "phone": "07028390614",
            "email": null
        },
        {
            "sno": 54,
            "name": "Federal Medical Centre, Ebute Meta",
            "location": "Lagos",
            "phone": "08035515388",
            "email": "fmceblag@yahoo.com"
        },
        {
            "sno": 55,
            "name": "FCT Primary Healthcare Development Board",
            "location": "Abuja",
            "phone": "08036182337",
            "email": "fctphcdb@yahoo.com"
        },
        {
            "sno": 56,
            "name": "Neuropsychiatric Hospital, Aro",
            "location": "Abeokuta",
            "phone": "039-779503",
            "email": "provost@neuroaro.com"
        },
        {
            "sno": 57,
            "name": "Society of Occupational and Environmental Health Physicians of Nigeria, Lagos",
            "location": "Lagos",
            "phone": "08057099338",
            "email": "nat.sec@soehpon-ng.org"
        },
        {
            "sno": 58,
            "name": "Edo State Hospital Management Board",
            "location": "Benin",
            "phone": "08056375250",
            "email": "vexomokoike@yahoo.com"
        },
        {
            "sno": 59,
            "name": "Medical Women Association of Nigeria",
            "location": "Abuja",
            "phone": "08036650203",
            "email": "mwanfct11@yahoo.com"
        },
        {
            "sno": 60,
            "name": "Military Hospital, Ikoyi",
            "location": "Lagos",
            "phone": "08191431787",
            "email": null
        },
        {
            "sno": 61,
            "name": "Medical and Dental Consultants Association of Nigeria, Abuja Branch",
            "location": "Abuja",
            "phone": "08034234229",
            "email": null
        },
        {
            "sno": 62,
            "name": "Federal Medical Centre, Nguru Yobe State",
            "location": "Yobe",
            "phone": "08036516134",
            "email": "md@fmcnguru.gov.ng"
        },
        {
            "sno": 63,
            "name": "Ministry of Health, Asaba",
            "location": "Delta",
            "phone": "080803430118",
            "email": "enife@yahoo.com"
        },
        {
            "sno": 64,
            "name": "Society for Gastroenterology and Hepatology in Nigeria",
            "location": null,
            "phone": "08037194917",
            "email": "dendan.ndu@gmail.com"
        },
        {
            "sno": 65,
            "name": "Epidemiology Society of Nigeria",
            "location": "Ibadan",
            "phone": "08023392616",
            "email": "epidsociety@yahoo.com"
        },
        {
            "sno": 66,
            "name": "Nigerian National Petroleum Corporation, Group Medical Centre",
            "location": "Abuja",
            "phone": "0946085039",
            "email": null
        },
        {
            "sno": 67,
            "name": "Bowen University Teaching Hospital",
            "location": "Oyo State",
            "phone": "08034102152",
            "email": "buth@gmail.com"
        },
        {
            "sno": 68,
            "name": "MENDS Training Institute MENDS Specialist Hospital",
            "location": "Kaduna",
            "phone": "08033112061",
            "email": "owolabi1234@gmail.com"
        },
        {
            "sno": 69,
            "name": "Delta State University Teaching Hospital, Oghara",
            "location": "Delta State",
            "phone": [
                "08035785839",
                "08033607346"
            ],
            "email": "drobiaboayabo@yahoo.com"
        },
        {
            "sno": 70,
            "name": "Association of Rural Surgical Practitioners of Nigeria, ARSPON",
            "location": "Nkwogwu, Aboh-Mbaise, Imo State",
            "phone": [
                "08066220361",
                "08023138905"
            ],
            "email": null
        },
        {
            "sno": 71,
            "name": "Ladoke Akintola University Teaching Hospital",
            "location": "Osogbo",
            "phone": [
                "07033328615",
                "08034077336"
            ],
            "email": null
        },
        {
            "sno": 72,
            "name": "National Orthopaedic Hospital",
            "location": "Kano",
            "phone": "08023106019",
            "email": "nohdala@orthopaedichospitaldala.org"
        },
        {
            "sno": 73,
            "name": "68 Nigerian Army Reference Hospital",
            "location": "Lagos",
            "phone": "08023199004",
            "email": null
        },
        {
            "sno": 74,
            "name": "Nigerian Association of Dermatologists",
            "location": null,
            "phone": "08191355367",
            "email": "www.dermatologyng.com"
        },
        {
            "sno": 75,
            "name": "College of Medicine University of Lagos",
            "location": "Lagos",
            "phone": "01-5835629",
            "email": "info@cmu.edu.ng"
        },
        {
            "sno": 76,
            "name": "Intercountry Centre for Oral Health (ICOH) For Africa",
            "location": "Jos",
            "phone": "07098203421",
            "email": "ectoh@yahoo.co.uk"
        },
        {
            "sno": 77,
            "name": "Nigerian Society of Neonatal Medicine",
            "location": "UBTH",
            "phone": "08023346693",
            "email": "nisonm.nigeria@gmail.com"
        },
        {
            "sno": 78,
            "name": "The West African College of Surgeons (WACS)",
            "location": "Lagos",
            "phone": null,
            "email": "info@wacs"
        },
        {
            "sno": 79,
            "name": "Anambra State University Teaching Hospital, Awka",
            "location": "Anambra State",
            "phone": "08039329882",
            "email": null
        },
        {
            "sno": 80,
            "name": "Central Bank of Nigeria Medical Service Department",
            "location": "Abuja",
            "phone": "08070603521",
            "email": null
        },
        {
            "sno": 81,
            "name": "Mother and Child Hospital, Akure",
            "location": "Akure",
            "phone": "08163593435",
            "email": "omooyeneyin@yahoo.com"
        },
        {
            "sno": 82,
            "name": "Association of Rural Surgical Practitioners of Nigeria",
            "location": "Imo State",
            "phone": "09066220361",
            "email": "aarspon@yahoo.com"
        },
        {
            "sno": 83,
            "name": "44 Nigerian Army Reference Hospital",
            "location": "Kaduna",
            "phone": "062-831194",
            "email": "reference.hospital@yahoo.com"
        },
        {
            "sno": 84,
            "name": "Clinical Training and Research Centre",
            "location": "Kaduna",
            "phone": "08059600901",
            "email": "emteetee@yahoo.com"
        },
        {
            "sno": 85,
            "name": "Seventh Day Adventist Hospital",
            "location": "Ile-Ife",
            "phone": "08078193640",
            "email": "pmesda@gmail.com"
        },
        {
            "sno": 86,
            "name": "Federal Medical Centre",
            "location": "Katsina",
            "phone": "08035051720",
            "email": "fmckatsina@yahoo.com"
        },
        {
            "sno": 87,
            "name": "Ahmadu Bello University Teaching Hospital, Zaria",
            "location": "Kaduna",
            "phone": "08033174870",
            "email": "cmdabuth@yahoo.com"
        },
        {
            "sno": 88,
            "name": "National Orthopedic Hospital Igbobi",
            "location": "Lagos",
            "phone": "08122879302",
            "email": "nohilagos@nohilagos.org"
        },
        {
            "sno": 89,
            "name": "Endocrine and Metabolism Society of Nigeria",
            "location": "Lagos",
            "phone": "08033008127",
            "email": "nigerianendoctinologysoc@yahoo.com"
        },
        {
            "sno": 90,
            "name": "Federal Medical Centre",
            "location": "Gombe",
            "phone": "07081456608",
            "email": "cmd@fmcgombe.org"
        },
        {
            "sno": 91,
            "name": "Federal Neuro-Psychiatric Hospital, Yaba",
            "location": "Lagos",
            "phone": "01-7743174",
            "email": "neuropsychiatrichospitalyaba@yahoo.com"
        },
        {
            "sno": 92,
            "name": "Federal Medical Centre",
            "location": "Bida",
            "phone": [
                "08058697801",
                "08058697802",
                "08058697803"
            ],
            "email": "fmcbida@yahoo.com"
        },
        {
            "sno": 93,
            "name": "Barau Dikko Specialist Hospital",
            "location": "Kaduna",
            "phone": "+234-08033146100",
            "email": null
        },
        {
            "sno": 94,
            "name": "College of Medicine, University of Lagos",
            "location": "Lagos",
            "phone": "01-5835629",
            "email": "info@cmed.edu.ng"
        },
        {
            "sno": 95,
            "name": "College of Medicine Lagos State University, Ikeja",
            "location": "Lagos State",
            "phone": null,
            "email": null
        },
        {
            "sno": 96,
            "name": "Federal Medical Center, Ido-Ekiti",
            "location": "Ekiti State",
            "phone": null,
            "email": "majekayod@yahoo.com"
        },
        {
            "sno": 97,
            "name": "Medical and Dental Consultants Association of Nigeria (MDCAN) NDUTH, Okolobiri",
            "location": "Belyesa State",
            "phone": [
                "08034510717",
                "07031819695"
            ],
            "email": "mdcanduth@yahoo.group.com"
        },
        {
            "sno": 98,
            "name": "Benue State University Teaching Hospital, Makurdi",
            "location": "Benue",
            "phone": "08037001800",
            "email": "aomalu@gmail.com"
        },
        {
            "sno": 99,
            "name": "Medical Women’s Association of Nigeria (National)",
            "location": "Abuja",
            "phone": [
                "08092463917",
                "08034028617"
            ],
            "email": "mwaninfo@gmail.com"
        },
        {
            "sno": 100,
            "name": "Faculty of Ophthalmology, National Postgraduate Medical College of Nigeria",
            "location": "Lagos",
            "phone": "08031907552",
            "email": "nwoseb@hotmail.com"
        },

        {
            "sno": 101,
            "name": "HYGEIA HMO LIMITED",
            "location": "Lagos",
            "phone": "01-4617071, 01-4617073, 08036710207",
            "email": ""
        },
        {
            "sno": 102,
            "name": "TOTAL HEALTH TRUST LIMITED",
            "location": "Lagos",
            "phone": "01-4701813, 01-7747150",
            "email": ""
        },
        {
            "sno": 103,
            "name": "CLEARLINE INTERNATIONAL LIMITED",
            "location": "Lagos",
            "phone": "01-7741092, 4977542, 09-6725605, 2730839, 0806006004",
            "email": ""
        },
        {
            "sno": 104,
            "name": "HEALTHCARE INTERNATIONAL LIMITED",
            "location": "Lagos/Abuja",
            "phone": "01-4705701, 01-4705702, 09-6709099, 6739099, 09-5238589, 6724509, 08033151956",
            "email": ""
        },
        {
            "sno": 105,
            "name": "MEDI PLAN HEALTH CARE LIMITED",
            "location": "Lagos/Abuja",
            "phone": "01-2611012, 01-2614828, 08033081650",
            "email": ""
        }

    ];

    // Filter hospitals based on search terms
    const filteredHospitals = hospitals.filter(hospital => {
        const nameMatch = hospital.name.toLowerCase().includes(searchTerm.toLowerCase());
        const locationMatch = hospital.location && hospital.location.toLowerCase().includes(searchLocation.toLowerCase());

        return nameMatch && (searchLocation === '' || locationMatch);
    });

    // Clear search filters
    const clearSearch = () => {
        setSearchTerm('');
        setSearchLocation('');
    };

    // Function to handle array phone numbers - now with proper typing
    const getPhoneDisplay = (phone: string | string[] | null): string | null => {
        if (!phone) return null;
        return Array.isArray(phone) ? phone[0] : phone;
    };

    return (
        <div className="container mx-auto px-4 pt-20 py-6">
            {/* Search Section */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                <h2 className="text-xl font-bold text-gray-800 mb-3">Find Hospitals</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search by hospital name"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm('')}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                <X size={16} />
                            </button>
                        )}
                    </div>

                    <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Filter by location"
                            value={searchLocation}
                            onChange={(e) => setSearchLocation(e.target.value)}
                            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {searchLocation && (
                            <button
                                onClick={() => setSearchLocation('')}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                <X size={16} />
                            </button>
                        )}
                    </div>
                </div>

                {(searchTerm || searchLocation) && (
                    <div className="flex justify-end">
                        <button
                            onClick={clearSearch}
                            className="text-blue-600 hover:text-blue-800 font-medium flex items-center text-sm"
                        >
                            Clear all filters
                            <X size={14} className="ml-1" />
                        </button>
                    </div>
                )}
            </div>

            {/* Results Summary */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-700">
                    Found {filteredHospitals.length} {filteredHospitals.length === 1 ? 'hospital' : 'hospitals'}
                </h2>
            </div>

            {/* Hospital Cards Grid - Made smaller with more columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredHospitals.map(hospital => (
                    <div key={hospital.sno} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
                        <div className="bg-blue-600 h-1 w-full"></div>
                        <div className="p-4">
                            <h3 className="text-base font-bold text-gray-800 mb-2 line-clamp-2 h-12">{hospital.name}</h3>

                            <div className="space-y-2 text-sm text-gray-600">
                                {hospital.location && (
                                    <div className="flex items-start">
                                        <MapPin className="h-4 w-4 mr-1 text-blue-500 flex-shrink-0 mt-0.5" />
                                        <p className="line-clamp-1">{hospital.location}</p>
                                    </div>
                                )}

                                {hospital.phone && (
                                    <div className="flex items-center">
                                        <Phone className="h-4 w-4 mr-1 text-blue-500" />
                                        <p className="truncate">{getPhoneDisplay(hospital.phone)}</p>
                                    </div>
                                )}

                                {hospital.email && (
                                    <div className="flex items-center">
                                        <Mail className="h-4 w-4 mr-1 text-blue-500" />
                                        <p className="truncate">{hospital.email}</p>
                                    </div>
                                )}
                            </div>

                            <div className="mt-4 pt-2 border-t border-gray-100">
                                <Link href={`/hospital/${hospital.sno}`} className="text-blue-600 hover:text-blue-800 text-sm font-medium inline-flex items-center">
                                    View Details
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {filteredHospitals.length === 0 && (
                <div className="bg-white rounded-lg shadow-md p-6 text-center">
                    <div className="mb-3">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">No hospitals found</h3>
                    <p className="mt-2 text-sm text-gray-500">
                        Try adjusting your search filters or browse all hospitals.
                    </p>
                    <button
                        onClick={clearSearch}
                        className="mt-3 px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Clear filters
                    </button>
                </div>
            )}
        </div>
    );
};

export default Providers;
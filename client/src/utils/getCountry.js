async function detectCountryByIP() {
    try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();

        if (data.country_code) {
            console.log('Detected Country Code:', data.country_code);
            return data.country_code;
        }
    } catch (error) {
        console.error('Error detecting country by IP:', error);
    }
    return null;
}

detectCountryByIP().then(countryCode => {
    if (countryCode) {
        console.log("User is from:", countryCode);
        // Use the countryCode (e.g. pre-fill a form)
    }
});
export default detectCountryByIP;
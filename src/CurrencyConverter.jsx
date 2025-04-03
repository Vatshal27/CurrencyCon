import React, { useState, useEffect, useCallback } from 'react';
import Select from 'react-select';
import './CurrencyConverter.css';

const CurrencyConverter = () => {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('');
  const [toCurrency, setToCurrency] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [rates, setRates] = useState({});
  const [lastUpdated, setLastUpdated] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });

  // API Configuration
  const API_KEY = process.env.REACT_APP_API_KEY;
  const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/`;



  // // New API URL pointing to our Node.js backend
  // const API_URL = 'http://localhost:5000/api/rates/';



  // List of currencies with code, name, and symbol
 const currencies = [
    { value: '', label: 'Select Currency', symbol: '' },
    { value: 'USD', label: 'US Dollar', symbol: '$' },
    { value: 'EUR', label: 'Euro', symbol: '€' },
    { value: 'GBP', label: 'British Pound', symbol: '£' },
    { value: 'JPY', label: 'Japanese Yen', symbol: '¥' },
    { value: 'AED', label: 'UAE Dirham', symbol: 'د.إ' },
    { value: 'AFN', label: 'Afghan Afghani', symbol: '؋' },
    { value: 'ALL', label: 'Albanian Lek', symbol: 'L' },
    { value: 'AMD', label: 'Armenian Dram', symbol: '֏' },
    { value: 'ANG', label: 'Netherlands Antillean Guilder', symbol: 'ƒ' },
    { value: 'AOA', label: 'Angolan Kwanza', symbol: 'Kz' },
    { value: 'ARS', label: 'Argentine Peso', symbol: '$' },
    { value: 'AUD', label: 'Australian Dollar', symbol: 'A$' },
    { value: 'AWG', label: 'Aruban Florin', symbol: 'ƒ' },
    { value: 'AZN', label: 'Azerbaijani Manat', symbol: '₼' },
    { value: 'BAM', label: 'Bosnia-Herzegovina Convertible Mark', symbol: 'KM' },
    { value: 'BBD', label: 'Barbadian Dollar', symbol: '$' },
    { value: 'BDT', label: 'Bangladeshi Taka', symbol: '৳' },
    { value: 'BGN', label: 'Bulgarian Lev', symbol: 'лв' },
    { value: 'BHD', label: 'Bahraini Dinar', symbol: '.د.ب' },
    { value: 'BIF', label: 'Burundian Franc', symbol: 'FBu' },
    { value: 'BMD', label: 'Bermudan Dollar', symbol: '$' },
    { value: 'BND', label: 'Brunei Dollar', symbol: '$' },
    { value: 'BOB', label: 'Bolivian Boliviano', symbol: 'Bs.' },
    { value: 'BRL', label: 'Brazilian Real', symbol: 'R$' },
    { value: 'BSD', label: 'Bahamian Dollar', symbol: '$' },
    { value: 'BTN', label: 'Bhutanese Ngultrum', symbol: 'Nu.' },
    { value: 'BWP', label: 'Botswanan Pula', symbol: 'P' },
    { value: 'BYN', label: 'Belarusian Ruble', symbol: 'Br' },
    { value: 'BZD', label: 'Belize Dollar', symbol: 'BZ$' },
    { value: 'CAD', label: 'Canadian Dollar', symbol: 'C$' },
    { value: 'CDF', label: 'Congolese Franc', symbol: 'FC' },
    { value: 'CHF', label: 'Swiss Franc', symbol: 'CHF' },
    { value: 'CLP', label: 'Chilean Peso', symbol: '$' },
    { value: 'CNY', label: 'Chinese Yuan', symbol: '¥' },
    { value: 'COP', label: 'Colombian Peso', symbol: '$' },
    { value: 'CRC', label: 'Costa Rican Colón', symbol: '₡' },
    { value: 'CUP', label: 'Cuban Peso', symbol: '₱' },
    { value: 'CVE', label: 'Cape Verdean Escudo', symbol: '$' },
    { value: 'CZK', label: 'Czech Republic Koruna', symbol: 'Kč' },
    { value: 'DJF', label: 'Djiboutian Franc', symbol: 'Fdj' },
    { value: 'DKK', label: 'Danish Krone', symbol: 'kr' },
    { value: 'DOP', label: 'Dominican Peso', symbol: 'RD$' },
    { value: 'DZD', label: 'Algerian Dinar', symbol: 'دج' },
    { value: 'EGP', label: 'Egyptian Pound', symbol: 'E£' },
    { value: 'ERN', label: 'Eritrean Nakfa', symbol: 'Nfk' },
    { value: 'ETB', label: 'Ethiopian Birr', symbol: 'Br' },
    { value: 'FJD', label: 'Fijian Dollar', symbol: 'FJ$' },
    { value: 'FKP', label: 'Falkland Islands Pound', symbol: '£' },
    { value: 'FOK', label: 'Faroese Króna', symbol: 'kr' },
    { value: 'GEL', label: 'Georgian Lari', symbol: '₾' },
    { value: 'GGP', label: 'Guernsey Pound', symbol: '£' },
    { value: 'GHS', label: 'Ghanaian Cedi', symbol: '₵' },
    { value: 'GIP', label: 'Gibraltar Pound', symbol: '£' },
    { value: 'GMD', label: 'Gambian Dalasi', symbol: 'D' },
    { value: 'GNF', label: 'Guinean Franc', symbol: 'FG' },
    { value: 'GTQ', label: 'Guatemalan Quetzal', symbol: 'Q' },
    { value: 'GYD', label: 'Guyanaese Dollar', symbol: '$' },
    { value: 'HKD', label: 'Hong Kong Dollar', symbol: 'HK$' },
    { value: 'HNL', label: 'Honduran Lempira', symbol: 'L' },
    { value: 'HRK', label: 'Croatian Kuna', symbol: 'kn' },
    { value: 'HTG', label: 'Haitian Gourde', symbol: 'G' },
    { value: 'HUF', label: 'Hungarian Forint', symbol: 'Ft' },
    { value: 'IDR', label: 'Indonesian Rupiah', symbol: 'Rp' },
    { value: 'ILS', label: 'Israeli New Shekel', symbol: '₪' },
    { value: 'IMP', label: 'Manx pound', symbol: '£' },
    { value: 'INR', label: 'Indian Rupee', symbol: '₹' },
    { value: 'IQD', label: 'Iraqi Dinar', symbol: 'ع.د' },
    { value: 'IRR', label: 'Iranian Rial', symbol: '﷼' },
    { value: 'ISK', label: 'Icelandic Króna', symbol: 'kr' },
    { value: 'JEP', label: 'Jersey Pound', symbol: '£' },
    { value: 'JMD', label: 'Jamaican Dollar', symbol: 'J$' },
    { value: 'JOD', label: 'Jordanian Dinar', symbol: 'JD' },
    { value: 'KES', label: 'Kenyan Shilling', symbol: 'KSh' },
    { value: 'KGS', label: 'Kyrgystani Som', symbol: 'с' },
    { value: 'KHR', label: 'Cambodian Riel', symbol: '៛' },
    { value: 'KID', label: 'Kiribati Dollar', symbol: '$' },
    { value: 'KMF', label: 'Comorian Franc', symbol: 'CF' },
    { value: 'KRW', label: 'South Korean Won', symbol: '₩' },
    { value: 'KWD', label: 'Kuwaiti Dinar', symbol: 'KD' },
    { value: 'KYD', label: 'Cayman Islands Dollar', symbol: '$' },
    { value: 'KZT', label: 'Kazakhstani Tenge', symbol: '₸' },
    { value: 'LAK', label: 'Laotian Kip', symbol: '₭' },
    { value: 'LBP', label: 'Lebanese Pound', symbol: 'L£' },
    { value: 'LKR', label: 'Sri Lankan Rupee', symbol: 'Rs' },
    { value: 'LRD', label: 'Liberian Dollar', symbol: '$' },
    { value: 'LSL', label: 'Lesotho Loti', symbol: 'L' },
    { value: 'LYD', label: 'Libyan Dinar', symbol: 'LD' },
    { value: 'MAD', label: 'Moroccan Dirham', symbol: 'MAD' },
    { value: 'MDL', label: 'Moldovan Leu', symbol: 'L' },
    { value: 'MGA', label: 'Malagasy Ariary', symbol: 'Ar' },
    { value: 'MKD', label: 'Macedonian Denar', symbol: 'ден' },
    { value: 'MMK', label: 'Myanma Kyat', symbol: 'K' },
    { value: 'MNT', label: 'Mongolian Tugrik', symbol: '₮' },
    { value: 'MOP', label: 'Macanese Pataca', symbol: 'MOP$' },
    { value: 'MRU', label: 'Mauritanian Ouguiya', symbol: 'UM' },
    { value: 'MUR', label: 'Mauritian Rupee', symbol: '₨' },
    { value: 'MVR', label: 'Maldivian Rufiyaa', symbol: 'Rf' },
    { value: 'MWK', label: 'Malawian Kwacha', symbol: 'MK' },
    { value: 'MXN', label: 'Mexican Peso', symbol: '$' },
    { value: 'MYR', label: 'Malaysian Ringgit', symbol: 'RM' },
    { value: 'MZN', label: 'Mozambican Metical', symbol: 'MT' },
    { value: 'NAD', label: 'Namibian Dollar', symbol: '$' },
    { value: 'NGN', label: 'Nigerian Naira', symbol: '₦' },
    { value: 'NIO', label: 'Nicaraguan Córdoba', symbol: 'C$' },
    { value: 'NOK', label: 'Norwegian Krone', symbol: 'kr' },
    { value: 'NPR', label: 'Nepalese Rupee', symbol: '₨' },
    { value: 'NZD', label: 'New Zealand Dollar', symbol: 'NZ$' },
    { value: 'OMR', label: 'Omani Rial', symbol: '﷼' },
    { value: 'PAB', label: 'Panamanian Balboa', symbol: 'B/.' },
    { value: 'PEN', label: 'Peruvian Nuevo Sol', symbol: 'S/.' },
    { value: 'PGK', label: 'Papua New Guinean Kina', symbol: 'K' },
    { value: 'PHP', label: 'Philippine Peso', symbol: '₱' },
    { value: 'PKR', label: 'Pakistani Rupee', symbol: '₨' },
    { value: 'PLN', label: 'Polish Złoty', symbol: 'zł' },
    { value: 'PYG', label: 'Paraguayan Guarani', symbol: '₲' },
    { value: 'QAR', label: 'Qatari Rial', symbol: '﷼' },
    { value: 'RON', label: 'Romanian Leu', symbol: 'lei' },
    { value: 'RSD', label: 'Serbian Dinar', symbol: 'din' },
    { value: 'RUB', label: 'Russian Ruble', symbol: '₽' },
    { value: 'RWF', label: 'Rwandan Franc', symbol: 'FRw' },
    { value: 'SAR', label: 'Saudi Riyal', symbol: '﷼' },
    { value: 'SBD', label: 'Solomon Islands Dollar', symbol: '$' },
    { value: 'SCR', label: 'Seychellois Rupee', symbol: '₨' },
    { value: 'SDG', label: 'Sudanese Pound', symbol: 'ج.س.' },
    { value: 'SEK', label: 'Swedish Krona', symbol: 'kr' },
    { value: 'SGD', label: 'Singapore Dollar', symbol: 'S$' },
    { value: 'SHP', label: 'Saint Helena Pound', symbol: '£' },
    { value: 'SLE', label: 'Sierra Leonean Leone', symbol: 'Le' },
    { value: 'SOS', label: 'Somali Shilling', symbol: 'S' },
    { value: 'SRD', label: 'Surinamese Dollar', symbol: '$' },
    { value: 'SSP', label: 'South Sudanese Pound', symbol: '£' },
    { value: 'STN', label: 'São Tomé and Príncipe Dobra', symbol: 'Db' },
    { value: 'SYP', label: 'Syrian Pound', symbol: '£' },
    { value: 'SZL', label: 'Swazi Lilangeni', symbol: 'L' },
    { value: 'THB', label: 'Thai Baht', symbol: '฿' },
    { value: 'TJS', label: 'Tajikistani Somoni', symbol: 'SM' },
    { value: 'TMT', label: 'Turkmenistani Manat', symbol: 'T' },
    { value: 'TND', label: 'Tunisian Dinar', symbol: 'DT' },
    { value: 'TOP', label: 'Tongan Paanga', symbol: 'T$' },
    { value: 'TRY', label: 'Turkish Lira', symbol: '₺' },
    { value: 'TTD', label: 'Trinidad and Tobago Dollar', symbol: 'TT$' },
    { value: 'TVD', label: 'Tuvaluan Dollar', symbol: '$' },
    { value: 'TWD', label: 'New Taiwan Dollar', symbol: 'NT$' },
    { value: 'TZS', label: 'Tanzanian Shilling', symbol: 'TSh' },
    { value: 'UAH', label: 'Ukrainian Hryvnia', symbol: '₴' },
    { value: 'UGX', label: 'Ugandan Shilling', symbol: 'USh' },
    { value: 'UYU', label: 'Uruguayan Peso', symbol: '$U' },
    { value: 'UZS', label: 'Uzbekistan Som', symbol: 'лв' },
    { value: 'VES', label: 'Venezuelan Bolívar', symbol: 'Bs' },
    { value: 'VND', label: 'Vietnamese Dong', symbol: '₫' },
    { value: 'VUV', label: 'Vanuatu Vatu', symbol: 'VT' },
    { value: 'WST', label: 'Samoan Tala', symbol: 'WS$' },
    { value: 'XAF', label: 'Central African CFA Franc', symbol: 'FCFA' },
    { value: 'XCD', label: 'East Caribbean Dollar', symbol: 'EC$' },
    { value: 'XDR', label: 'Special Drawing Rights', symbol: 'SDR' },
    { value: 'XOF', label: 'West African CFA Franc', symbol: 'CFA' },
    { value: 'XPF', label: 'CFP Franc', symbol: '₣' },
    { value: 'YER', label: 'Yemeni Rial', symbol: '﷼' },
    { value: 'ZAR', label: 'South African Rand', symbol: 'R' },
    { value: 'ZMW', label: 'Zambian Kwacha', symbol: 'ZK' },
    { value: 'ZWL', label: 'Zimbabwean Dollar', symbol: 'Z$' }
  ];

  // Get currency symbol
  const getCurrencySymbol = (currencyCode) => {
    const currency = currencies.find(c => c.value === currencyCode);
    return currency ? currency.symbol : '';
  };

  // Effect to handle theme changes
  useEffect(() => {
    document.body.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  // Fetch exchange rates
  const fetchRates = useCallback(async () => {
    if (!fromCurrency || !API_KEY) {
      return;
    }
  
    // Avoid fetching if we have recent rates
    if (lastUpdated && Date.now() - lastUpdated < 3600000) {
      return;
    }
  
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_URL}${fromCurrency}`);
      if (!response.ok) {
        throw new Error('Failed to fetch exchange rates');
      }
      const data = await response.json();
      if (data.result === "error") {
        throw new Error(data['error-type'] || 'Failed to fetch exchange rates');
      }
      setRates(data.conversion_rates);
      setLastUpdated(Date.now());
    } catch (err) {
      console.error('Error fetching rates:', err);
      setError('Could not load exchange rates. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [fromCurrency, lastUpdated, API_URL]);
  

  // Initial fetch and currency change handler
  useEffect(() => {
    fetchRates();
  }, [fetchRates]);

  // Handle conversion when amount or currencies change
  useEffect(() => {
    if (amount && fromCurrency && toCurrency) {
      if (!rates[toCurrency]) {
        setError('Please select both currencies and enter an amount.');
        setResult('');
        return;
      }
      try {
        const conversion = (parseFloat(amount) * rates[toCurrency]);
        setResult(isNaN(conversion) ? '' : conversion.toFixed(2));
        setError(''); // Clear any previous errors on successful conversion
      } catch (err) {
        setError('Conversion error. Please try again.');
        setResult('');
      }
    } else {
      setResult('');
      setError(''); // Clear error when no conversion is being attempted
    }
  }, [amount, fromCurrency, toCurrency, rates]);

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setAmount(value);
      setError(''); // Clear error when amount changes
    }
  };

  const handleCurrencyChange = (option, isFrom) => {
    if (isFrom) {
      setFromCurrency(option.value);
      setLastUpdated(null); // Force a new fetch
    } else {
      setToCurrency(option.value);
    }
    setError(''); // Clear error when currency changes
  };

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  if (loading) {
    return (
      <div className="converter-container">
        <div className="loading-message">
          <div className="spinner"></div>
          <p>Loading exchange rates...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-wrapper">
      <button 
        className="theme-toggle" 
        onClick={toggleTheme}
        aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        {isDarkMode ? '🌞' : '🌜'}
      </button>

      <div className="converter-container">
        {error && <div className="error-message">{error}</div>}
        
        <div className="conversion-row">
          <div className="input-group">
            <label>Amount</label>
            <div className="input-with-symbol">
              <span className="currency-symbol">{getCurrencySymbol(fromCurrency)}</span>
              <input
                type="text"
                className="amount-input"
                value={amount}
                onChange={handleAmountChange}
                placeholder="Enter amount"
              />
            </div>
            <Select
              className="currency-select"
              classNamePrefix="currency-select"
              value={currencies.find(c => c.value === fromCurrency)}
              onChange={(option) => handleCurrencyChange(option, true)}
              options={currencies}
              placeholder="Select currency"
              isDisabled={loading}
            />
          </div>

          <button 
            className="swap-button"
            onClick={handleSwapCurrencies}
            aria-label="Swap currencies"
            disabled={loading}
          >
            ⇄
          </button>

          <div className="input-group">
            <label>Result</label>
            <div className="input-with-symbol">
              <span className="currency-symbol">{getCurrencySymbol(toCurrency)}</span>
              <input
                type="text"
                className="result-input"
                value={result}
                readOnly
                placeholder="Converted amount"
              />
            </div>
            <Select
              className="currency-select"
              classNamePrefix="currency-select"
              value={currencies.find(c => c.value === toCurrency)}
              onChange={(option) => handleCurrencyChange(option, false)}
              options={currencies}
              placeholder="Select currency"
              isDisabled={loading}
            />
          </div>
        </div>

        {loading && (
          <div className="spinner-container">
            <div className="spinner"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrencyConverter;

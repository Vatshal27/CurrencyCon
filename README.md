# Currency Converter

A modern currency converter application built with React that supports over 150 currencies worldwide. Features a clean, responsive design with dark/light mode support.

## Features

- Real-time currency conversion
- Support for 150+ currencies
- Dark/Light mode toggle
- Responsive design
- Clean and modern UI
- Live exchange rates

## Setup

1. Clone the repository:
```bash
git clone https://github.com/your-username/currency-converter.git
cd currency-converter
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Replace `your_api_key_here` with your actual API key from [ExchangeRate-API](https://www.exchangerate-api.com/)
```bash
cp .env.example .env
```

4. Start the development server:
```bash
npm start
```

## Environment Variables

The following environment variables are required:

- `REACT_APP_API_KEY`: Your ExchangeRate-API key
- `REACT_APP_API_URL`: The API endpoint (default: https://api.exchangerate-api.com/v4/latest/)

## Security Note

Never commit your `.env` file or expose your API key. The `.env` file is included in `.gitignore` to prevent accidental commits.

## Technologies Used

- React
- React Select
- CSS3
- ExchangeRate-API

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 
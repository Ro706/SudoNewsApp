# Sudo News App

A React-based news application that fetches news articles from various categories using the News API and displays them in a user-friendly interface.

## Features

- **Dynamic Routes**: Navigate through different news categories such as Business, Entertainment, Health, Sports, Technology, and Science.
- **Loading Bar**: Displays a top loading bar to indicate data fetching progress.
- **Environment Variables**: Uses environment variables to securely store the News API key.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Ro706/SudoNewsApp.git
   cd myReactApp
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your News API key:

   ```env
   REACT_APP_NEWS_API=your_api_key_here
   ```

4. Start the development server:

   ```bash
   npm start
   ```

## Usage

The app includes the following routes, each displaying news from a different category:

- `/` - General News
- `/business` - Business News
- `/entertainment` - Entertainment News
- `/health` - Health News
- `/sports` - Sports News
- `/technology` - Technology News
- `/science` - Science News

## Components

- **NavBar**: Navigation bar to switch between different news categories.
- **News**: Fetches and displays news articles based on the selected category and provided API key.
- **LoadingBar**: Shows a loading bar at the top of the page during data fetching.


## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Feel free to customize the content as per your requirements.

# Cloudflare Worker - AWS Cognito Hosted UI Customization

This repository contains a Cloudflare Worker script that demonstrates advanced customizations of the AWS Cognito hosted UI using Cloudflare Workers and the HTMLRewriter API. It allows developers to apply custom styles, titles, and additional content beyond AWS's standard customization options, without the need to build a custom SSO sign-in UI, reset password, or sign-up pages. This approach saves development time and ensures consistency with your brand’s design, all while enhancing the user experience.

## Features

- **Custom Favicon:** Injects custom favicon links into the `<head>` of the HTML response.
- **Custom Styles:** Applies custom styles to the AWS Cognito UI, such as button colors and background colors.
- **Custom Page Title:** Modifies the page title to provide a more personalized experience.
- **Additional Links:** Adds a custom link below the sign-in form to redirect users back to the main website.

## How It Works

The Worker listens for incoming requests and checks if they are `GET` requests with an `HTML` content type. If the conditions are met, it uses the `HTMLRewriter` API to modify the HTML response by:

1. **Modifying the `<head>` element:**
   - Adds custom favicon links.
   - Injects custom CSS styles for buttons and background color.

2. **Modifying the `<title>` element:**
   - Changes the page title to "SSO Sign In - Santiagogarza.co".

3. **Modifying the `<form>` element:**
   - Adds a link below the form to navigate back to the main website.

## Configuring the Route

To ensure that the Worker is triggered for requests to your Cognito hosted UI, you need to configure the route in your wrangler.toml file to match the subdomain of your hosted UI. For example:

```toml
routes = [
    { pattern = "sso.santiagogarza.co/*", zone_name = "santiagogarza.co"}
]
```
This configuration routes all traffic for sso.santiagogarza.co through the Cloudflare Worker, allowing it to intercept and modify the UI as needed.

## Deployment

To deploy this Cloudflare Worker, follow these steps:

1. **Install npm packages** (if not already installed):
   ```bash
   npm install
   ```

2. **Login to Cloudflare**:
   ```bash
   npm run login
   ```

3. **Deploy the Worker**:
   ```bash
   npm run deploy
   ```


## Try it out

[![Live Demo](https://img.shields.io/badge/Live%20Demo-EF2D5E?style=for-the-badge&logoColor=white)](https://sso.santiagogarza.co/login?response_type=code&client_id=1o82uvnv0ljg3guvgb59f89tkr&redirect_uri=https%3A%2F%2Fwww.santiagogarza.co%2Fcallback%2F&state=https%3A%2F%2Fwww.santiagogarza.co)

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Author

- Santiago Garza - [santiagogarza.co](https://www.santiagogarza.co/)

---

Feel free to customize and extend this Worker as needed to fit your specific requirements!

<!-- @format -->

# React 18 Application with Typescript

A React application constructed using version 18 and the most important hooks. The app uses a simple mock server deployed using Azure Web App. The first time the page load may take
approximately 2 minutes due to the warm-up time of the Azure Free Tier service plan.

## Application Link

You can visit the website using the following link: [React 18 Application](https://meddist-ecommerce.sobreiro.dev/)

## Structure

```
├── meddist
│   ├── src
│   │    ├── components --> All components that build up the pages
│   │    ├── hooks --> Some custom hooks like the hook for sending HTTP requests
│   │    ├── images --> Compressed images (size smaller than 10 MB to load instantaneously by React)
│   │    ├── models --> Some important types
│   │    ├── pages --> Page components rendered using React Routes Dom
│   │    ├── store --> Slicer and Store responsible by the shopping cart (Redux)
│   │    ├── UI --> Somo components used throughout the app like Buttons, Modals, and etc
│   │    ├── App.tsx --> Is the main components where the page browser routes is created
│   ├── ...
│   ├── package.json
│   ├── package-lock.json
```

## Highlights

### Redux

The shopping cart is entirely build using Redux. The persistence on the Local Storage of the cart uses the redux-persist package.

```
├── meddist
│   ├── src
│   │    ├── ...
│   │    ├── store --> Slicer and Store responsible by the shopping cart (Redux)
```

You can visit the source code following the folder structure above.

### Custom Hooks

```
├── meddist
│   ├── src
│   │    ├── ...
│   │    ├── hooks --> Some custom hooks like the hook for sending HTTP requests
```

The main idea behind custom hooks is the possibility of sharing logic without repeting code. To avoid repeting the code for sending simple HTTP requests the custom hook useHttp is available.

### Tests

Jest and the React Testing Library were used to build Unit Tests for the components.

### CI/CD

Given the fact that the application does not use any server side rendering, that is, the applicationg is completely rendered on the client side, the hosting of the application uses Azure Static Web (low price). We could also use Azure Storage Account with Static Web Site Hosting enabled, but Azure Static Web gives us more flexibility and access for other features like Server Side capabilities using Azure Functions and Environment Variables.
The build and release of the application is available through two different approaches: Git Hub Actions and Azure DevOps. The Github Actions is available inside the actions tab within this Repo and the Azure DevOps project is available on the following links:

- [Build Pipeline](https://dev.azure.com/richardsobreiro/Personal%20Profile/_build?definitionId=23)
- [Release Pipeline](https://dev.azure.com/richardsobreiro/Personal%20Profile/_release?_a=releases&view=mine&definitionId=1)

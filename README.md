# kodmob
Mobile version of kodilan.com built with React Native

<img width="1295" alt="koders" src="https://user-images.githubusercontent.com/61799852/153759823-6abee7c4-3a67-4a90-85d1-92824c92f5ee.jpg">

## Set up
Clone and setup the repository:

```bash
git clone https://github.com/tinas/kodmob.git
cd kodmob
yarn install
```

If you're on a Mac and developing for iOS, you need to install the pods (via [Cocoapods](https://cocoapods.org/)) to complete the linking.
```bash
yarn pod
```

## Running 

### Step 1: Start Metro
First, you will need to start Metro, the JavaScript bundler that ships with React Native. Metro "takes in an entry file and various options, and returns a single JavaScript file that includes all your code and its dependencies." —[Metro Docs](https://facebook.github.io/metro/docs/concepts)

To start Metro, run npx react-native start inside your React Native project folder:
```bash
yarn start
```

### Step 2: Start your application
Let Metro Bundler run in its own terminal. Open a new terminal inside your React Native project folder. Run the following:
```bash
yarn ios
```

if you are developing on android:
```bash
yarn android
```

For detailed setup, visit React Native [guides](https://reactnative.dev/docs/environment-setup).


## License
MIT © [Ahmet Tınastepe](https://github.com/tinas)

> See [LICENSE](LICENSE) for details.

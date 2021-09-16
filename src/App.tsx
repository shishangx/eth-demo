import "./styles.css";

declare global {
  interface Window {
    ethereum: any;
    imToken: any;
  }
}

const ethereum = window.ethereum;
const imToken = window.imToken;

const alert = imToken
  ? function (s: string) {
      imToken.callAPI("native.toastInfo", JSON.stringify(s));
    }
  : window.alert;


const alertErr = (err: Error) => {
  alert(err.message);
};

const eth_getChainId = () => {
  return ethereum
    .request({ method: "net_version" })
    .then((result: any) => {
      alert("16:0x" + Number(result).toString(16) + "\n" + "10:" + result);
    })
    .catch(alertErr);
};


const methods = [
  {
    func: eth_getChainId,
    name: "eth_getChainId",
    code: eth_getChainId.toString()
  }
];

export default function App() {
  return (
    <div className="App">
      <h3 id="h1">Demo</h3>
      {methods.map((method) => {
        return (
          <section key={method.name}>
            <button onClick={method.func}>{method.name}</button>
            <details>
              <summary>show code</summary>
              <pre>{method.code}</pre>
            </details>
          </section>
        );
      })}
    </div>
  );
}

(() => {
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined")
      return require.apply(this, arguments);
    throw Error('Dynamic require of "' + x + '" is not supported');
  });

  // LoginRegister.tsx
  var import_react = __require("react");
  var import_jsx_runtime = __require("react/jsx-runtime");
  var LoginRegister = () => {
    const [isLogin, setIsLogin] = (0, import_react.useState)(true);
    const [email, setEmail] = (0, import_react.useState)("");
    const [password, setPassword] = (0, import_react.useState)("");
    const [confirmPassword, setConfirmPassword] = (0, import_react.useState)("");
    const handleLoginSubmit = (e) => {
      e.preventDefault();
      console.log("Login attempt:", { email, password });
    };
    const handleRegisterSubmit = (e) => {
      e.preventDefault();
      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      console.log("Register attempt:", { email, password });
    };
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: styles.container, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: styles.card, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { style: styles.title, children: isLogin ? "Login" : "Register" }),
      isLogin ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", { onSubmit: handleLoginSubmit, style: styles.form, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "input",
          {
            type: "email",
            placeholder: "Email",
            value: email,
            onChange: (e) => setEmail(e.target.value),
            required: true,
            style: styles.input
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "input",
          {
            type: "password",
            placeholder: "Password",
            value: password,
            onChange: (e) => setPassword(e.target.value),
            required: true,
            style: styles.input
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "submit", style: styles.button, children: "Login" })
      ] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", { onSubmit: handleRegisterSubmit, style: styles.form, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "input",
          {
            type: "email",
            placeholder: "Email",
            value: email,
            onChange: (e) => setEmail(e.target.value),
            required: true,
            style: styles.input
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "input",
          {
            type: "password",
            placeholder: "Password",
            value: password,
            onChange: (e) => setPassword(e.target.value),
            required: true,
            style: styles.input
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "input",
          {
            type: "password",
            placeholder: "Confirm Password",
            value: confirmPassword,
            onChange: (e) => setConfirmPassword(e.target.value),
            required: true,
            style: styles.input
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "submit", style: styles.button, children: "Register" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { style: styles.toggleText, children: [
        isLogin ? "Don't have an account?" : "Already have an account?",
        " ",
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { onClick: () => setIsLogin(!isLogin), style: styles.toggleLink, children: isLogin ? "Register here" : "Login here" })
      ] })
    ] }) });
  };
  var styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      backgroundColor: "#f0f2f5",
      fontFamily: "Arial, sans-serif"
    },
    card: {
      backgroundColor: "#fff",
      padding: "40px",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      width: "350px",
      textAlign: "center"
    },
    title: {
      marginBottom: "20px",
      color: "#333"
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "15px"
    },
    input: {
      padding: "12px",
      borderRadius: "4px",
      border: "1px solid #ddd",
      fontSize: "16px"
    },
    button: {
      padding: "12px",
      borderRadius: "4px",
      border: "none",
      backgroundColor: "#007bff",
      color: "#fff",
      fontSize: "16px",
      cursor: "pointer",
      transition: "background-color 0.3s ease"
    },
    buttonHover: {
      backgroundColor: "#0056b3"
    },
    toggleText: {
      marginTop: "20px",
      color: "#555"
    },
    toggleLink: {
      color: "#007bff",
      cursor: "pointer",
      textDecoration: "underline"
    }
  };
  var LoginRegister_default = LoginRegister;
})();

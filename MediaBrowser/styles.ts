export default {
  preview: {
    figure: {
      position: "relative",
      color: "silver",
      textAlign: "center",
      outline: "dashed silver 1px",
      width: "100%",
      paddingTop: "80%",
    },
    img: {
      position: "absolute",
      left: 0,
      top: 0,
      width: "100%",
      maxHeight: "100%",
    },
    button: {
      width: "100%",
    },
  },
  modal: {
    wrapper: { padding: 0 },
    tab: {
      wrapper: { textAlign: "center" },
      icon: {
        fontSize: "16px",
        margin: 0,
        padding: 0
      },
      body: {
        wrapper: {
          padding: "16px",
          height: "320px",
          overflowY: "scroll"
        },
        a: {
          display: "block",
          border: "solid silver 1px",
          outline: "none",
          position: "relative",
          width: "100%",
          paddingTop: "80%"
        },
        figure: {
          position: "absolute",
          left: 0,
          top: 0,
          height: "100%",
          padding: "8px"
        },
        img: {
          width: "100%",
          opacity: "90%",
          maxHeight: "100%"
        }
      }
    }
  }
};

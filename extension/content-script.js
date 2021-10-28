const xpath = [
  './/div[@class="memberAddition__body"]//button[.//input[@type="checkbox"]]',
  './/div[@class="memberAddition__body"]//button//input[@type="checkbox"]',
].join("|");

const callback = (mutations, observer) => {
  const elements = [];

  for (const mutation of mutations) {
    for (const node of mutation.addedNodes) {
      const result = document.evaluate(
        xpath,
        node,
        null,
        XPathResult.UNORDERED_NODE_ITERATOR_TYPE,
        null
      );

      let element = result.iterateNext();
      while (element != null) {
        elements.push(element);
        element = result.iterateNext();
      }
    }
  }

  for (const element of elements) {
    element.disabled = true;
  }
};

const ovserve = (target) => {
  const observer = new MutationObserver(callback);
  observer.observe(target, { childList: true, subtree: true });
};

const run = () => {
  let timeoutId;

  const observer = new MutationObserver((mutations, observer) => {
    const target = document.getElementById("RootModalsEntryPoint");
    if (target != null) {
      clearTimeout(timeoutId);
      observer.disconnect();
      ovserve(target);
    }
  });

  observer.observe(document.body, { childList: true });

  timeoutId = setTimeout(() => {
    observer.disconnect();
    console.error("chatwork-disable-check-all: target element not found");
  }, 5000);
};

run();

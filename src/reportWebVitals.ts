const reportWebVitals = (onPerfEntry?: any) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then((vitals) => {
      (vitals as any).getCLS(onPerfEntry);
      (vitals as any).getFID(onPerfEntry);
      (vitals as any).getFCP(onPerfEntry);
      (vitals as any).getLCP(onPerfEntry);
      (vitals as any).getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;

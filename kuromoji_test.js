// 辞書を読み込んで初期化
kuromoji.builder({ dicPath: './dict/' }).build(function (err, tokenizer) {
  if (err) {
    console.error(err);
    return;
  }

  const input = "明日はコンビニでおにぎりを買う";
  const tokens = tokenizer.tokenize(input);
  console.log(tokens);

  let result = tokens.map(token => {
    // 読みがあるときだけカタカナに（そのまま読みとして使える）
    return token.reading || token.surface_form;
  }).join(' ');

  document.getElementById('output').textContent = result;
});

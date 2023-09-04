window.onload = function () {
    document.getElementById('game').style.visibility = 'hidden';
  };
  
  function Jogador(nome, forma) {
    this.nome = nome;
    this.forma = forma;
  }
  
  var jogador1, jogador2;
  var jogadorAtual;
  var formas = ['X', 'O'];
  var index = null;
  
  var tabuleiro = new Array(9);
  
  function initGame() {
    var nomeJogador1 = document.getElementById('jogador1').value;
    var nomeJogador2 = document.getElementById('jogador2').value;
    jogador1 = new Jogador(nomeJogador1, 'X');
    jogador2 = new Jogador(nomeJogador2, 'O');
  
    jogadorAtual = jogador1;
    setLabelJogadorAtual();
  
    document.getElementById('game').style.visibility = 'visible';
  }
  
  function reset() {
    window.location.reload();
  }
  
  function setLabelJogadorAtual() {
    var jogadorAtualLabel = document.getElementById('jogadorAtual');
    jogadorAtualLabel.innerHTML = 'Jogador atual: ' + jogadorAtual.nome;
    jogadorAtualLabel.style.color = jogadorAtual.forma === 'X' ? '#3498db' : '#e74c3c';
  }
  
  function tabuleiroIsFilled() {
    for (var i = 0; i < tabuleiro.length; i++) {
      if (tabuleiro[i] === undefined) {
        return false;
      }
    }
    return true;
  }
  
  function checkWinner() {
    var winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Linhas
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colunas
      [0, 4, 8], [2, 4, 6] // Diagonais
    ];
  
    for (var i = 0; i < winningCombinations.length; i++) {
      var [a, b, c] = winningCombinations[i];
      if (tabuleiro[a] && tabuleiro[a] === tabuleiro[b] && tabuleiro[a] === tabuleiro[c]) {
        alert(jogadorAtual.nome + ' wins!!!');
        reset();
        return;
      }
    }
  
    if (tabuleiroIsFilled()) {
      alert('Empate! Ninguém venceu. Tente novamente.');
      reset();
    } else {
      // Alternar jogador
      jogadorAtual = jogadorAtual === jogador1 ? jogador2 : jogador1;
      setLabelJogadorAtual();
    }
  }
  
  function setOnCeil(cel, pos) {
    if (tabuleiro[pos] === undefined) {
      cel.innerHTML = jogadorAtual.forma;
      tabuleiro[pos] = jogadorAtual.forma;
      cel.style.pointerEvents = 'none';
      checkWinner();
    } else {
      alert('Essa célula já está preenchida. Escolha outra.');
    }
  }
  
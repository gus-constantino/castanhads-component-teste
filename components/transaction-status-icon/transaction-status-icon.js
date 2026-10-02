/**
 * @deps shaped-icon
 * <cds-transaction-status-icon> — .Transaction Status Icon · .Building Blocks · set 5488:658
 * Shaped Icon (Small, 40) com appearance e ícone por Status:
 *   receipt → Positive · request-balance-line      completed → Neutral · balance-line
 *   withdraw → Neutral · expenses-line             refund → Neutral · down-line
 *   canceled → Negative · slash-line               status6 → Negative · balance-canceled-line (nome do Figma, C55)
 *   under-analysis → Informative · reload-clock-line   pending → Warning · warning-line
 * Atributos: status (padrão receipt) · label (nome acessível; sem ele é decorativo)
 * Nenhum componente usa este building block no Figma hoje (C55); o Content List Item aceita via transaction-status.
 */
(function(){
  "use strict";
  var MAP = {
    "receipt": ["positive", "request-balance-line", "Recebimento"], "completed": ["neutral", "balance-line", "Concluída"],
    "withdraw": ["neutral", "expenses-line", "Saque"], "refund": ["neutral", "down-line", "Estorno"],
    "canceled": ["negative", "slash-line", "Cancelada"], "status6": ["negative", "balance-canceled-line", "Status6"],
    "under-analysis": ["informative", "reload-clock-line", "Em análise"], "pending": ["warning", "warning-line", "Pendente"]
  };
  class CdsTransactionStatusIcon extends CDS.Element {
    static get observedAttributes(){ return ["status", "label"]; }
    static get map(){ return MAP; }
    render(){
      var k = (this.getAttribute("status") || "receipt").toLowerCase().replace(/\s+/g, "-"), m = MAP[k] || MAP.receipt;
      if (!this.si) this.si = this.appendChild(CDS.create("cds-shaped-icon", { size: "small" }));
      CDS.attr(this.si, "appearance", m[0]); CDS.attr(this.si, "icon", m[1]);
      CDS.attr(this.si, "label", this.getAttribute("label"));
    }
  }
  CDS.TransactionStatus = MAP;
  CdsTransactionStatusIcon.define("cds-transaction-status-icon");
})();

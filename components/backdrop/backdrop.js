/**
 * @deps —
 * <cds-backdrop> — Backdrop · Containers · componente 13784:3271
 * Camada Surface/inversed com opacity medium (0.4) que separa um overlay da interface por baixo.
 * Cobre o pai posicionado (position:absolute; inset:0). Modal, Drawer e Bottom Sheet usam o mesmo visual no ::backdrop do <dialog>.
 */
(function(){
  "use strict";
  class CdsBackdrop extends CDS.Element { render(){ this.setAttribute("aria-hidden", "true"); } }
  CdsBackdrop.define("cds-backdrop");
})();

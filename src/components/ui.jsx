import { useEffect, useRef, useState } from 'react';
import { animate, motion, useInView, useReducedMotion } from 'motion/react';

export const externo = { target: '_blank', rel: 'noopener noreferrer' };

const estilos = {
  ouro: 'bg-ouro text-noite hover:shadow-[0_10px_34px_-8px_#d8c130aa]',
  escuro: 'bg-tinta text-marfim hover:shadow-[0_12px_30px_-10px_#16180f99]',
};

/** Botão ou link com um brilho que atravessa a superfície. */
export function Botao({ href, cor = 'ouro', className = '', children, ...resto }) {
  const Tag = href ? motion.a : motion.button;
  return (
    <Tag
      href={href}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.97 }}
      className={`relative inline-flex min-h-13 items-center justify-center overflow-hidden rounded-full px-7 py-3 font-semibold transition-shadow ${estilos[cor]} ${className}`}
      {...(href?.startsWith('http') ? externo : {})}
      {...resto}
    >
      <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 w-1/3 animate-brilho bg-linear-to-r from-transparent via-white/50 to-transparent" />
      <span className="relative">{children}</span>
    </Tag>
  );
}

/** Entrada suave quando o bloco aparece na tela (uma única vez). */
export function Surge({ children, atraso = 0, de = { y: 36 }, como = 'div', ...resto }) {
  const Tag = motion[como];
  return (
    <Tag
      initial={{ opacity: 0, ...de }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: atraso, ease: [0.22, 1, 0.36, 1] }}
      {...resto}
    >
      {children}
    </Tag>
  );
}

/** Título de seção com um traço dourado que se desenha. */
export function Titulo({ children, className = '' }) {
  return (
    <Surge>
      <h2 className={`text-4xl leading-tight font-light tracking-tight md:text-5xl ${className}`}>{children}</h2>
      <motion.span
        aria-hidden="true"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.25 }}
        className="mt-4 block h-1 w-20 origin-left rounded-full bg-ouro"
      />
    </Surge>
  );
}

export function Contador({ valor, casas = 0 }) {
  const ref = useRef(null);
  const visto = useInView(ref, { once: true });
  const reduzido = useReducedMotion();
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!visto) return;
    if (reduzido) return setN(valor);
    const c = animate(0, valor, { duration: 1.6, ease: 'easeOut', onUpdate: setN });
    return () => c.stop();
  }, [visto, valor, reduzido]);
  const texto = (v) => v.toFixed(casas).replace('.', ',');
  return (
    <span ref={ref}>
      <span aria-hidden="true" className="tabular-nums">{texto(n)}</span>
      <span className="sr-only">{texto(valor)}</span>
    </span>
  );
}

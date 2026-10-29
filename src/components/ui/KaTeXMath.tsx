import React, { useMemo } from 'react';
import katex from 'katex';

interface KaTeXMathProps {
  math: string;
  block?: boolean;
  className?: string;
}

export const KaTeXMath: React.FC<KaTeXMathProps> = ({ math, block = false, className = '' }) => {
  const html = useMemo(() => {
    try {
      return katex.renderToString(math, {
        displayMode: block,
        throwOnError: false
      });
    } catch (e) {
      console.error('KaTeX error:', e);
      return math;
    }
  }, [math, block]);

  return <span className={className} dangerouslySetInnerHTML={{ __html: html }} />;
};

export default KaTeXMath;

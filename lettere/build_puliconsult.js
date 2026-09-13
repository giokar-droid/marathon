const fs = require('fs');
const { Document, Packer, Paragraph, TextRun, AlignmentType, LevelFormat } = require('docx');

const R = (text, o = {}) => new TextRun({ text, bold: !!o.bold, size: o.size ?? 22, font: 'Calibri' });
const P = (text, o = {}) => new Paragraph({
  spacing: { after: o.after ?? 180, line: 288 },
  alignment: o.align ?? AlignmentType.JUSTIFIED,
  numbering: o.bullet ? { reference: 'bul', level: 0 } : undefined,
  children: [R(text, o)],
});
const L = (text, bold = false) => P(text, { after: 0, align: AlignmentType.LEFT, bold });

const doc = new Document({
  numbering: { config: [{ reference: 'bul', levels: [{ level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] }] },
  sections: [{
    properties: { page: { margin: { top: 1300, bottom: 1000, left: 1418, right: 1418 } } },
    children: [
      L('Maria Isaura De Almeida Coelho', true), L('Via G. Maggi 4'), L('6963 Pregassona'), L('076 558 27 69 · isauracoelho20@gmail.com'),
      P('', { after: 300 }),
      L('Puliconsult SA', true), L('Ufficio del personale'), L('Via Industria 60'), L('6987 Caslano'),
      P('', { after: 300 }),
      P('Lugano, 13.09.2026', { align: AlignmentType.LEFT }),
      P('Oggetto: Candidatura come impiegata di pulizie – sede di Lugano (annuncio Job-Room)', { bold: true, align: AlignmentType.LEFT, after: 240 }),
      P('Gentili Signore e Signori,'),
      P('in riferimento al Vostro annuncio pubblicato su Job-Room per sette posti di impiegato/a di pulizie a Lugano, a tempo indeterminato e con entrata in servizio immediata, desidero sottoporVi la mia candidatura.'),
      P('Abito a Pregassona, a pochi minuti dal centro di Lugano: sono quindi facilmente raggiungibile sugli oggetti che seguite in città e disponibile anche con breve preavviso, sia al mattino presto sia nelle fasce serali, quando gli uffici sono liberi.'),
      P('Ho maturato la mia esperienza nel settore sia qui in Ticino sia in precedenza in Portogallo. Da ottobre 2023 a settembre 2025 sono stata alle dipendenze di Villa Helios SA a Castagnola, dove mi sono occupata delle attività domestiche e di pulizia degli spazi della struttura; da gennaio a luglio 2026 ho condotto in autonomia, a tempo pieno, un’economia domestica privata a Ruvigliana. In precedenza, per oltre vent’anni, ho lavorato in un consultorio medico in Portogallo, dove oltre alle mansioni di segreteria mi occupavo quotidianamente anche della pulizia dei locali.'),
      P('Le mansioni descritte nel Vostro annuncio corrispondono a ciò che svolgo abitualmente:'),
      P('pulizia e riordino di uffici e locali', { bullet: true, after: 40 }),
      P('spolvero e igienizzazione delle superfici', { bullet: true, after: 40 }),
      P('svuotamento dei cestini e raccolta dei rifiuti', { bullet: true, after: 40 }),
      P('sanificazione di bagni e aree comuni', { bullet: true, after: 40 }),
      P('lavaggio e sanificazione di pavimenti e superfici', { bullet: true, after: 180 }),
      P('Conosco i prodotti e le attrezzature professionali per la pulizia e il loro corretto dosaggio, nel rispetto delle norme di igiene e sicurezza sul lavoro, e sono abituata a organizzare il lavoro in autonomia seguendo il piano di pulizia assegnato, con la cura e la discrezione che richiedono gli spazi dei clienti.'),
      P('Il mio percorso in ambito sanitario mi ha abituata a procedure igieniche rigorose, alla precisione e alla puntualità.'),
      P('Parlo italiano, portoghese e francese e dispongo della patente di guida cat. B. Sono disponibile da subito, con un grado di occupazione flessibile, dal tempo parziale fino al 100%, secondo le Vostre esigenze di pianificazione.'),
      P('Allego il mio curriculum vitae e i certificati di lavoro; posso inoltre fornire referenze su richiesta. Resto volentieri a disposizione per un colloquio conoscitivo o per una giornata di prova.'),
      P('Cordiali saluti.', { after: 500, align: AlignmentType.LEFT }),
      L('Maria Isaura De Almeida Coelho'),
      P('', { after: 300 }),
      P('Allegati: curriculum vitae, certificati di lavoro', { size: 20, align: AlignmentType.LEFT }),
    ],
  }],
});
Packer.toBuffer(doc).then(b => fs.writeFileSync('Lettera_motivazione_Puliconsult_SA_Maria_Isaura_De_Almeida_Coelho.docx', b));

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  renderToBuffer,
} from "@react-pdf/renderer";

const COLORS = {
  navy: "#FF6422",
  blue: "#2F5597",
  lightBlue: "#D9EAF7",
  veryLightBlue: "#EEF5FB",
  gray: "#666666",
  lightGray: "#E7E6E6",
  dark: "#222222",
  white: "#FFFFFF",
};

const styles = StyleSheet.create({
  page: {
    paddingTop: 45,
    paddingBottom: 55,
    paddingHorizontal: 48,
    fontFamily: "Helvetica",
    fontSize: 10,
    color: COLORS.dark,
    position: "relative",
  },

  /* =========================
     HEADER
  ========================= */

  mainTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.navy,
    marginBottom: 6,
    textAlign: "center",
  },

  subtitle: {
    fontSize: 11,
    color: COLORS.gray,
    textAlign: "center",
    marginBottom: 25,
  },

  /* =========================
     CONTENTS
  ========================= */

  contentsBox: {
    backgroundColor: COLORS.veryLightBlue,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.blue,
    padding: 12,
    marginBottom: 22,
  },

  contentsTitle: {
    fontSize: 13,
    fontWeight: "bold",
    color: COLORS.navy,
    marginBottom: 8,
  },

  contentsItem: {
    fontSize: 9.5,
    marginBottom: 4,
    color: COLORS.dark,
  },

  /* =========================
     SECTION
  ========================= */

  section: {
    marginBottom: 18,
  },

  sectionHeader: {
    backgroundColor: COLORS.navy,
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "bold",
    padding: 8,
    marginBottom: 10,
  },

  subHeading: {
    fontSize: 11,
    fontWeight: "bold",
    color: COLORS.blue,
    marginTop: 5,
    marginBottom: 6,
  },

  paragraph: {
    fontSize: 9.5,
    lineHeight: 1.5,
    marginBottom: 6,
  },

  bullet: {
    fontSize: 9.5,
    lineHeight: 1.45,
    marginBottom: 4,
    marginLeft: 10,
  },

  /* =========================
     FORMULA
  ========================= */

  formulaBox: {
    backgroundColor: COLORS.veryLightBlue,
    borderWidth: 1,
    borderColor: COLORS.lightBlue,
    padding: 10,
    marginTop: 6,
    marginBottom: 10,
    alignItems: "center",
  },

  formula: {
    fontSize: 12,
    fontWeight: "bold",
    color: COLORS.navy,
    textAlign: "center",
  },

  /* =========================
     WORKED EXAMPLE
  ========================= */

  workedExample: {
    marginTop: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
  },

  workedHeader: {
    backgroundColor: COLORS.blue,
    padding: 7,
  },

  workedHeaderText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: "bold",
  },

  workedBody: {
    padding: 10,
    backgroundColor: COLORS.veryLightBlue,
  },

  question: {
    fontSize: 9.5,
    fontWeight: "bold",
    marginBottom: 8,
  },

  solution: {
    fontSize: 9.5,
    lineHeight: 1.5,
    marginBottom: 5,
  },

  mark: {
    color: COLORS.blue,
    fontWeight: "bold",
  },

  /* =========================
     TABLE
  ========================= */

  table: {
    width: "100%",
    marginTop: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
  },

  tableRow: {
    flexDirection: "row",
  },

  tableHeader: {
    backgroundColor: COLORS.navy,
  },

  tableCell: {
    flex: 1,
    padding: 7,
    fontSize: 8.5,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.lightGray,
  },

  tableHeaderText: {
    color: COLORS.white,
    fontWeight: "bold",
  },

  /* =========================
     TIP BOX
  ========================= */

  tipBox: {
    backgroundColor: COLORS.veryLightBlue,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.blue,
    padding: 10,
    marginTop: 8,
    marginBottom: 12,
  },

  tipTitle: {
    color: COLORS.navy,
    fontWeight: "bold",
    fontSize: 10,
    marginBottom: 5,
  },

  tipText: {
    fontSize: 9,
    lineHeight: 1.45,
  },

  /* =========================
     FOOTER
  ========================= */

  footer: {
    position: "absolute",
    bottom: 25,
    left: 48,
    right: 48,
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGray,
    paddingTop: 6,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  footerText: {
    fontSize: 7.5,
    color: COLORS.gray,
  },

  pageNumber: {
    fontSize: 7.5,
    color: COLORS.gray,
  },
});


const NotesPDF = ({ data }) => {
  return (
    <Document>

      <Page size="A4" style={styles.page}>

        {/* =========================
            TITLE
        ========================= */}

        <Text style={styles.mainTitle}>
          {data.title}
        </Text>

        <Text style={styles.subtitle}>
        </Text>


        {/* =========================
            CONTENTS
        ========================= */}

        {data.contents && (
          <View style={styles.contentsBox}>

            <Text style={styles.contentsTitle}>
              CONTENTS
            </Text>

            {data.contents.map((item, index) => (
              <Text
                key={index}
                style={styles.contentsItem}
              >
                {item}
              </Text>
            ))}

          </View>
        )}


        {/* =========================
            SECTIONS
        ========================= */}

        {data.sections?.map((section, sectionIndex) => (

          <View
            key={sectionIndex}
            style={styles.section}
            wrap={false}
          >

            {/* SECTION HEADER */}

            <Text style={styles.sectionHeader}>
              {section.number}. {section.heading}
            </Text>


            {/* SUB SECTIONS */}

            {section.subHeading && (
              <Text style={styles.subHeading}>
                {section.subHeading}
              </Text>
            )}


            {/* NORMAL CONTENT */}

            {section.content?.map((item, index) => (

              <Text
                key={index}
                style={styles.paragraph}
              >
                {item}
              </Text>

            ))}


            {/* BULLETS */}

            {section.bullets?.map((item, index) => (

              <Text
                key={index}
                style={styles.bullet}
              >
                • {item}
              </Text>

            ))}


            {/* FORMULA */}

            {section.formula && (

              <View style={styles.formulaBox}>

                <Text style={styles.formula}>
                  {section.formula}
                </Text>

              </View>

            )}

          </View>

        ))}


        {/* =========================
            FOOTER
        ========================= */}

        <View style={styles.footer}>

          <Text style={styles.footerText}>
            © 2026 My Notes. All rights reserved.
          </Text>

          <Text
            style={styles.pageNumber}
            render={({ pageNumber, totalPages }) =>
              `${pageNumber} / ${totalPages}`
            }
          />

        </View>

      </Page>

    </Document>
  );
};


export async function generatePDF(data) {

  try {

    const pdfBuffer = await renderToBuffer(
      <NotesPDF data={data} />
    );

    return pdfBuffer;

  } catch (error) {

    console.error(
      "PDF generation error:",
      error
    );

    throw error;
  }
}
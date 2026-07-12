/* eslint-disable react-refresh/only-export-components */
import { Link, useLocation } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

import { localeFromPathname, localeToPath, type LocaleCode } from "@/i18n/locales";

type LegalKind = "privacy" | "terms";

type LegalCopy = {
  back: string;
  updated: string;
  title: string;
  description: string;
  sections: Array<{ title: string; body: string }>;
  contact: string;
};

const updatedAt = "2026-07-12";

const localeName: Record<LocaleCode, string> = {
  en: "en-US",
  zh: "zh-CN",
  ja: "ja-JP",
  de: "de-DE",
  fr: "fr-FR",
  es: "es-ES",
  ko: "ko-KR",
  pt: "pt-PT",
};

const contactTitle: Record<LocaleCode, string> = {
  en: "Contact",
  zh: "联系我们",
  ja: "お問い合わせ",
  de: "Kontakt",
  fr: "Contact",
  es: "Contacto",
  ko: "문의",
  pt: "Contato",
};

const legalCopy: Record<LocaleCode, Record<LegalKind, LegalCopy>> = {
  en: {
    privacy: {
      back: "Back to home",
      updated: "Last updated",
      title: "Privacy Policy",
      description: "How YesNAS collects, uses, and protects your information.",
      sections: [
        {
          title: "1. Introduction",
          body: 'This Privacy Policy explains how YesNAS ("we", "us", or "our") collects, uses, and shares information when you use our software, website, and related services.',
        },
        {
          title: "2. Information We Collect",
          body: "YesNAS is designed to run locally on your device. Files, photos, videos, metadata, and local AI indexes remain on your hardware. We may collect limited non-personal information such as anonymous usage statistics, crash reports, and version data to improve product quality.",
        },
        {
          title: "3. How We Use Information",
          body: "We use collected information to operate, maintain, secure, and improve the Services, diagnose technical issues, and respond when you contact support.",
        },
        {
          title: "4. Data Sharing",
          body: "We do not sell your personal information. We may share limited information with service providers that help operate the Services, or when required by law.",
        },
        {
          title: "5. Data Security",
          body: "We use reasonable technical and organizational measures to protect information under our control. No method of transmission or storage is completely secure.",
        },
        {
          title: "6. Your Rights",
          body: "Depending on your jurisdiction, you may have rights to access, correct, export, or delete personal information we hold about you.",
        },
        {
          title: "7. Children’s Privacy",
          body: "The Services are not directed to children under 13, and we do not knowingly collect personal information from children.",
        },
        {
          title: "8. Changes to This Policy",
          body: "We may update this Privacy Policy from time to time. Changes will be posted on this page with a revised effective date.",
        },
      ],
      contact: "If you have questions about this Privacy Policy, contact us at",
    },
    terms: {
      back: "Back to home",
      updated: "Last updated",
      title: "Terms of Use",
      description: "The terms and conditions governing your use of YesNAS.",
      sections: [
        {
          title: "1. Acceptance of Terms",
          body: 'By downloading, installing, or using YesNAS (the "Services"), you agree to be bound by these Terms of Use. If you do not agree, do not use the Services.',
        },
        {
          title: "2. License",
          body: "We grant you a limited, non-exclusive, non-transferable, revocable license to use the Services for personal, non-commercial purposes, subject to these Terms.",
        },
        {
          title: "3. Acceptable Use",
          body: "You agree not to use the Services for unlawful purposes, interfere with service integrity, attempt unauthorized access, or reverse engineer the Services except where permitted by law.",
        },
        {
          title: "4. User Content",
          body: "You retain all rights to the files, data, and content you process through the Services. You are responsible for your content and for having the rights needed to use it.",
        },
        {
          title: "5. Intellectual Property",
          body: "The Services, including software, design, and trademarks, are owned by us or our licensors and are protected by intellectual property laws.",
        },
        {
          title: "6. Disclaimers",
          body: 'The Services are provided "as is" and "as available" without warranties of any kind, express or implied.',
        },
        {
          title: "7. Limitation of Liability",
          body: "To the maximum extent permitted by law, we are not liable for indirect, incidental, special, consequential, or punitive damages, or loss of profits or data arising from your use of the Services.",
        },
        {
          title: "8. Changes and Termination",
          body: "We may modify these Terms or suspend access to the Services when necessary. Continued use after changes take effect constitutes acceptance of the revised Terms.",
        },
      ],
      contact: "Questions about these Terms? Contact us at",
    },
  },
  zh: {
    privacy: {
      back: "返回首页",
      updated: "最后更新",
      title: "隐私政策",
      description: "YesNAS 如何收集、使用和保护你的信息。",
      sections: [
        {
          title: "1. 简介",
          body: "本隐私政策说明 YesNAS（“我们”）在你使用软件、网站及相关服务时如何收集、使用和共享信息。",
        },
        {
          title: "2. 我们收集的信息",
          body: "YesNAS 设计为在你的设备本地运行。文件、照片、视频、元数据和本地 AI 索引保留在你的硬件上。我们可能收集有限的非个人信息，例如匿名使用统计、崩溃报告和版本数据，用于改进产品质量。",
        },
        {
          title: "3. 信息用途",
          body: "我们使用收集的信息来运行、维护、保护和改进服务，诊断技术问题，并在你联系支持时进行回复。",
        },
        {
          title: "4. 数据共享",
          body: "我们不会出售你的个人信息。仅在服务提供商协助运营服务或法律要求时，可能共享有限信息。",
        },
        {
          title: "5. 数据安全",
          body: "我们采取合理的技术和组织措施保护受我们控制的信息。但任何传输或存储方式都无法保证绝对安全。",
        },
        {
          title: "6. 你的权利",
          body: "根据你所在地区的法律，你可能有权访问、更正、导出或删除我们持有的与你有关的个人信息。",
        },
        {
          title: "7. 儿童隐私",
          body: "本服务不面向 13 岁以下儿童，我们也不会故意收集儿童的个人信息。",
        },
        {
          title: "8. 政策变更",
          body: "我们可能不时更新本隐私政策。变更会发布在本页面，并更新生效日期。",
        },
      ],
      contact: "如果你对本隐私政策有疑问，请联系",
    },
    terms: {
      back: "返回首页",
      updated: "最后更新",
      title: "使用条款",
      description: "规范你使用 YesNAS 的条款和条件。",
      sections: [
        {
          title: "1. 接受条款",
          body: "下载、安装或使用 YesNAS（“服务”）即表示你同意受本使用条款约束。如果不同意，请不要使用本服务。",
        },
        {
          title: "2. 许可",
          body: "在遵守本条款的前提下，我们授予你有限的、非排他的、不可转让的、可撤销的许可，用于个人非商业目的使用本服务。",
        },
        {
          title: "3. 可接受使用",
          body: "你不得将服务用于违法目的，不得干扰服务完整性，不得尝试未经授权访问，也不得在法律不允许的范围内反向工程服务。",
        },
        {
          title: "4. 用户内容",
          body: "你保留通过服务处理的文件、数据和内容的全部权利。你应对自己的内容负责，并确保拥有使用这些内容所需的权利。",
        },
        {
          title: "5. 知识产权",
          body: "服务中的软件、设计和商标由我们或许可方拥有，并受知识产权法律保护。",
        },
        { title: "6. 免责声明", body: "服务按“现状”和“可用”提供，不作任何明示或暗示担保。" },
        {
          title: "7. 责任限制",
          body: "在法律允许的最大范围内，我们不对因使用服务产生的间接、附带、特殊、后果性或惩罚性损害，或利润、数据损失承担责任。",
        },
        {
          title: "8. 变更与终止",
          body: "我们可能在必要时修改本条款或暂停服务访问。变更生效后继续使用服务，即表示接受修订后的条款。",
        },
      ],
      contact: "如对本条款有疑问，请联系",
    },
  },
  ja: {
    privacy: {
      back: "ホームへ戻る",
      updated: "最終更新日",
      title: "プライバシーポリシー",
      description: "YesNAS が情報を収集、使用、保護する方法について説明します。",
      sections: [
        {
          title: "1. はじめに",
          body: "本プライバシーポリシーは、YesNAS（「当社」）がソフトウェア、ウェブサイト、関連サービスの利用時に情報をどのように収集、使用、共有するかを説明します。",
        },
        {
          title: "2. 収集する情報",
          body: "YesNAS はデバイス上でローカルに動作するよう設計されています。ファイル、写真、動画、メタデータ、ローカル AI インデックスはあなたのハードウェア上に残ります。品質改善のため、匿名の利用統計、クラッシュレポート、バージョン情報など限定的な非個人情報を収集する場合があります。",
        },
        {
          title: "3. 情報の利用",
          body: "収集した情報は、サービスの運用、保守、保護、改善、技術的問題の診断、サポート対応に使用します。",
        },
        {
          title: "4. データ共有",
          body: "当社は個人情報を販売しません。サービス運営を支援する事業者、または法令により必要な場合に限り、限定的な情報を共有することがあります。",
        },
        {
          title: "5. データ保護",
          body: "当社は管理下の情報を保護するため合理的な技術的および組織的措置を講じます。ただし、送信や保存に完全な安全性はありません。",
        },
        {
          title: "6. あなたの権利",
          body: "地域の法令により、当社が保持する個人情報へのアクセス、訂正、エクスポート、削除を求める権利がある場合があります。",
        },
        {
          title: "7. 子どものプライバシー",
          body: "本サービスは 13 歳未満の子どもを対象としておらず、当社は子どもの個人情報を故意に収集しません。",
        },
        {
          title: "8. ポリシーの変更",
          body: "当社は本ポリシーを随時更新することがあります。変更は本ページに掲載され、更新日が改訂されます。",
        },
      ],
      contact: "本ポリシーに関するお問い合わせは",
    },
    terms: {
      back: "ホームへ戻る",
      updated: "最終更新日",
      title: "利用規約",
      description: "YesNAS の利用に適用される条件です。",
      sections: [
        {
          title: "1. 規約への同意",
          body: "YesNAS（「本サービス」）をダウンロード、インストール、または使用することで、本利用規約に同意したものとみなされます。同意しない場合は使用しないでください。",
        },
        {
          title: "2. ライセンス",
          body: "本規約に従うことを条件として、個人的かつ非商用目的で本サービスを使用する限定的、非独占的、譲渡不可、取消可能なライセンスを付与します。",
        },
        {
          title: "3. 許容される利用",
          body: "違法目的での利用、サービスの完全性の妨害、不正アクセスの試み、法律で認められないリバースエンジニアリングは禁止されています。",
        },
        {
          title: "4. ユーザーコンテンツ",
          body: "本サービスを通じて処理するファイル、データ、コンテンツの権利はあなたに帰属します。必要な権利を保有し、内容に責任を負うものとします。",
        },
        {
          title: "5. 知的財産",
          body: "本サービスに含まれるソフトウェア、デザイン、商標は当社またはライセンサーに帰属し、知的財産法で保護されています。",
        },
        {
          title: "6. 免責",
          body: "本サービスは「現状有姿」および「提供可能な範囲」で提供され、明示または黙示の保証を行いません。",
        },
        {
          title: "7. 責任の制限",
          body: "法律で認められる最大限の範囲において、当社は本サービスの利用に起因する間接的、付随的、特別、結果的、懲罰的損害、利益またはデータの損失について責任を負いません。",
        },
        {
          title: "8. 変更と終了",
          body: "必要に応じて本規約の変更またはサービスへのアクセス停止を行うことがあります。変更後の継続利用は改訂規約への同意を意味します。",
        },
      ],
      contact: "本規約に関するお問い合わせは",
    },
  },
  de: {
    privacy: {
      back: "Zurück zur Startseite",
      updated: "Zuletzt aktualisiert",
      title: "Datenschutzerklärung",
      description: "Wie YesNAS Informationen erhebt, verwendet und schützt.",
      sections: [
        {
          title: "1. Einführung",
          body: "Diese Datenschutzerklärung erklärt, wie YesNAS („wir“) Informationen erhebt, verwendet und teilt, wenn Sie unsere Software, Website und zugehörigen Dienste nutzen.",
        },
        {
          title: "2. Erhobene Informationen",
          body: "YesNAS ist für den lokalen Betrieb auf Ihrem Gerät konzipiert. Dateien, Fotos, Videos, Metadaten und lokale KI-Indizes bleiben auf Ihrer Hardware. Wir können begrenzte nicht personenbezogene Informationen wie anonyme Nutzungsstatistiken, Absturzberichte und Versionsdaten erheben, um die Produktqualität zu verbessern.",
        },
        {
          title: "3. Nutzung von Informationen",
          body: "Wir verwenden Informationen zum Betrieb, zur Wartung, Sicherheit und Verbesserung der Dienste, zur Diagnose technischer Probleme und zur Beantwortung von Supportanfragen.",
        },
        {
          title: "4. Weitergabe von Daten",
          body: "Wir verkaufen keine personenbezogenen Daten. Begrenzte Informationen können an Dienstleister oder bei gesetzlicher Verpflichtung weitergegeben werden.",
        },
        {
          title: "5. Datensicherheit",
          body: "Wir setzen angemessene technische und organisatorische Maßnahmen ein. Keine Übertragung oder Speicherung ist jedoch vollständig sicher.",
        },
        {
          title: "6. Ihre Rechte",
          body: "Je nach Rechtsordnung können Sie Rechte auf Auskunft, Berichtigung, Export oder Löschung personenbezogener Daten haben.",
        },
        {
          title: "7. Datenschutz von Kindern",
          body: "Die Dienste richten sich nicht an Kinder unter 13 Jahren, und wir erheben wissentlich keine personenbezogenen Daten von Kindern.",
        },
        {
          title: "8. Änderungen",
          body: "Wir können diese Erklärung gelegentlich aktualisieren. Änderungen werden mit aktualisiertem Datum auf dieser Seite veröffentlicht.",
        },
      ],
      contact: "Bei Fragen zu dieser Datenschutzerklärung kontaktieren Sie uns unter",
    },
    terms: {
      back: "Zurück zur Startseite",
      updated: "Zuletzt aktualisiert",
      title: "Nutzungsbedingungen",
      description: "Die Bedingungen für die Nutzung von YesNAS.",
      sections: [
        {
          title: "1. Annahme der Bedingungen",
          body: "Durch Herunterladen, Installieren oder Nutzen von YesNAS („Dienste“) stimmen Sie diesen Nutzungsbedingungen zu. Wenn Sie nicht zustimmen, nutzen Sie die Dienste nicht.",
        },
        {
          title: "2. Lizenz",
          body: "Wir gewähren Ihnen eine begrenzte, nicht exklusive, nicht übertragbare und widerrufliche Lizenz zur persönlichen, nicht kommerziellen Nutzung der Dienste.",
        },
        {
          title: "3. Zulässige Nutzung",
          body: "Sie dürfen die Dienste nicht rechtswidrig nutzen, die Integrität stören, unbefugten Zugriff versuchen oder sie außerhalb gesetzlich erlaubter Grenzen rückentwickeln.",
        },
        {
          title: "4. Nutzerinhalte",
          body: "Sie behalten alle Rechte an Dateien, Daten und Inhalten, die Sie über die Dienste verarbeiten, und sind für diese Inhalte verantwortlich.",
        },
        {
          title: "5. Geistiges Eigentum",
          body: "Software, Design und Marken der Dienste gehören uns oder unseren Lizenzgebern und sind rechtlich geschützt.",
        },
        {
          title: "6. Haftungsausschluss",
          body: "Die Dienste werden ohne Gewährleistung „wie besehen“ und „wie verfügbar“ bereitgestellt.",
        },
        {
          title: "7. Haftungsbeschränkung",
          body: "Soweit gesetzlich zulässig, haften wir nicht für indirekte, beiläufige, besondere, Folge- oder Strafschäden sowie Gewinn- oder Datenverluste.",
        },
        {
          title: "8. Änderungen und Beendigung",
          body: "Wir können diese Bedingungen ändern oder den Zugriff aussetzen. Die fortgesetzte Nutzung nach Änderungen gilt als Annahme.",
        },
      ],
      contact: "Fragen zu diesen Bedingungen? Kontaktieren Sie uns unter",
    },
  },
  fr: {
    privacy: {
      back: "Retour à l’accueil",
      updated: "Dernière mise à jour",
      title: "Politique de confidentialité",
      description: "Comment YesNAS collecte, utilise et protège vos informations.",
      sections: [
        {
          title: "1. Introduction",
          body: "Cette politique explique comment YesNAS (« nous ») collecte, utilise et partage des informations lorsque vous utilisez notre logiciel, notre site web et les services associés.",
        },
        {
          title: "2. Informations collectées",
          body: "YesNAS est conçu pour fonctionner localement sur votre appareil. Les fichiers, photos, vidéos, métadonnées et index d’IA locale restent sur votre matériel. Nous pouvons collecter des informations non personnelles limitées, comme des statistiques anonymes, rapports de crash et données de version, afin d’améliorer le produit.",
        },
        {
          title: "3. Utilisation",
          body: "Nous utilisons les informations pour exploiter, maintenir, sécuriser et améliorer les Services, diagnostiquer les problèmes techniques et répondre au support.",
        },
        {
          title: "4. Partage des données",
          body: "Nous ne vendons pas vos informations personnelles. Des informations limitées peuvent être partagées avec des prestataires ou lorsque la loi l’exige.",
        },
        {
          title: "5. Sécurité",
          body: "Nous appliquons des mesures techniques et organisationnelles raisonnables, mais aucune méthode de transmission ou de stockage n’est totalement sûre.",
        },
        {
          title: "6. Vos droits",
          body: "Selon votre juridiction, vous pouvez disposer de droits d’accès, de rectification, d’exportation ou de suppression de vos données personnelles.",
        },
        {
          title: "7. Vie privée des enfants",
          body: "Les Services ne s’adressent pas aux enfants de moins de 13 ans et nous ne collectons pas sciemment leurs informations personnelles.",
        },
        {
          title: "8. Modifications",
          body: "Nous pouvons mettre à jour cette politique. Les changements seront publiés sur cette page avec une date révisée.",
        },
      ],
      contact: "Pour toute question sur cette politique, contactez-nous à",
    },
    terms: {
      back: "Retour à l’accueil",
      updated: "Dernière mise à jour",
      title: "Conditions d’utilisation",
      description: "Les conditions régissant votre utilisation de YesNAS.",
      sections: [
        {
          title: "1. Acceptation",
          body: "En téléchargeant, installant ou utilisant YesNAS (« Services »), vous acceptez ces Conditions d’utilisation. Si vous n’êtes pas d’accord, n’utilisez pas les Services.",
        },
        {
          title: "2. Licence",
          body: "Nous vous accordons une licence limitée, non exclusive, non transférable et révocable pour utiliser les Services à des fins personnelles et non commerciales.",
        },
        {
          title: "3. Utilisation acceptable",
          body: "Vous ne devez pas utiliser les Services à des fins illégales, perturber leur intégrité, tenter un accès non autorisé ou les rétroconcevoir sauf si la loi l’autorise.",
        },
        {
          title: "4. Contenu utilisateur",
          body: "Vous conservez tous les droits sur les fichiers, données et contenus traités par les Services, et vous en êtes responsable.",
        },
        {
          title: "5. Propriété intellectuelle",
          body: "Les logiciels, designs et marques des Services appartiennent à nous ou à nos concédants et sont protégés par la loi.",
        },
        {
          title: "6. Avertissement",
          body: "Les Services sont fournis « en l’état » et « selon disponibilité », sans garantie d’aucune sorte.",
        },
        {
          title: "7. Limitation de responsabilité",
          body: "Dans les limites permises par la loi, nous ne sommes pas responsables des dommages indirects, accessoires, spéciaux, consécutifs ou punitifs, ni des pertes de profits ou de données.",
        },
        {
          title: "8. Modifications et résiliation",
          body: "Nous pouvons modifier ces Conditions ou suspendre l’accès. L’utilisation continue après modification vaut acceptation.",
        },
      ],
      contact: "Des questions sur ces Conditions ? Contactez-nous à",
    },
  },
  es: {
    privacy: {
      back: "Volver al inicio",
      updated: "Última actualización",
      title: "Política de privacidad",
      description: "Cómo YesNAS recopila, usa y protege tu información.",
      sections: [
        {
          title: "1. Introducción",
          body: "Esta Política explica cómo YesNAS («nosotros») recopila, usa y comparte información cuando utilizas nuestro software, sitio web y servicios relacionados.",
        },
        {
          title: "2. Información que recopilamos",
          body: "YesNAS está diseñado para ejecutarse localmente en tu dispositivo. Archivos, fotos, vídeos, metadatos e índices de IA local permanecen en tu hardware. Podemos recopilar información no personal limitada, como estadísticas anónimas, informes de fallos y datos de versión para mejorar el producto.",
        },
        {
          title: "3. Uso de la información",
          body: "Usamos la información para operar, mantener, proteger y mejorar los Servicios, diagnosticar problemas técnicos y responder al soporte.",
        },
        {
          title: "4. Compartición de datos",
          body: "No vendemos tu información personal. Podemos compartir información limitada con proveedores de servicios o cuando lo exija la ley.",
        },
        {
          title: "5. Seguridad",
          body: "Aplicamos medidas técnicas y organizativas razonables, aunque ningún método de transmisión o almacenamiento es completamente seguro.",
        },
        {
          title: "6. Tus derechos",
          body: "Según tu jurisdicción, puedes tener derechos de acceso, corrección, exportación o eliminación de datos personales.",
        },
        {
          title: "7. Privacidad infantil",
          body: "Los Servicios no están dirigidos a menores de 13 años y no recopilamos conscientemente información personal de niños.",
        },
        {
          title: "8. Cambios",
          body: "Podemos actualizar esta Política. Los cambios se publicarán en esta página con una fecha revisada.",
        },
      ],
      contact: "Si tienes preguntas sobre esta Política, contáctanos en",
    },
    terms: {
      back: "Volver al inicio",
      updated: "Última actualización",
      title: "Términos de uso",
      description: "Las condiciones que regulan tu uso de YesNAS.",
      sections: [
        {
          title: "1. Aceptación",
          body: "Al descargar, instalar o usar YesNAS («Servicios»), aceptas estos Términos de uso. Si no estás de acuerdo, no uses los Servicios.",
        },
        {
          title: "2. Licencia",
          body: "Te concedemos una licencia limitada, no exclusiva, no transferible y revocable para usar los Servicios con fines personales y no comerciales.",
        },
        {
          title: "3. Uso aceptable",
          body: "No puedes usar los Servicios con fines ilegales, interferir con su integridad, intentar acceso no autorizado ni aplicar ingeniería inversa salvo cuando la ley lo permita.",
        },
        {
          title: "4. Contenido del usuario",
          body: "Conservas todos los derechos sobre archivos, datos y contenido procesados mediante los Servicios, y eres responsable de ellos.",
        },
        {
          title: "5. Propiedad intelectual",
          body: "El software, diseño y marcas de los Servicios pertenecen a nosotros o a nuestros licenciantes y están protegidos por la ley.",
        },
        {
          title: "6. Descargos",
          body: "Los Servicios se proporcionan «tal cual» y «según disponibilidad», sin garantías de ningún tipo.",
        },
        {
          title: "7. Limitación de responsabilidad",
          body: "En la máxima medida permitida por la ley, no somos responsables por daños indirectos, incidentales, especiales, consecuentes o punitivos, ni por pérdida de beneficios o datos.",
        },
        {
          title: "8. Cambios y terminación",
          body: "Podemos modificar estos Términos o suspender el acceso. El uso continuado tras cambios implica aceptación.",
        },
      ],
      contact: "¿Preguntas sobre estos Términos? Contáctanos en",
    },
  },
  ko: {
    privacy: {
      back: "홈으로 돌아가기",
      updated: "마지막 업데이트",
      title: "개인정보 처리방침",
      description: "YesNAS가 정보를 수집, 사용, 보호하는 방식입니다.",
      sections: [
        {
          title: "1. 소개",
          body: "본 개인정보 처리방침은 YesNAS(“당사”)가 소프트웨어, 웹사이트 및 관련 서비스를 사용할 때 정보를 수집, 사용, 공유하는 방식을 설명합니다.",
        },
        {
          title: "2. 수집하는 정보",
          body: "YesNAS는 사용자의 장치에서 로컬로 실행되도록 설계되었습니다. 파일, 사진, 동영상, 메타데이터 및 로컬 AI 인덱스는 사용자의 하드웨어에 남습니다. 제품 품질 개선을 위해 익명 사용 통계, 충돌 보고서, 버전 데이터 등 제한적인 비개인 정보를 수집할 수 있습니다.",
        },
        {
          title: "3. 정보 사용",
          body: "수집한 정보는 서비스 운영, 유지보수, 보안, 개선, 기술 문제 진단 및 지원 응답에 사용됩니다.",
        },
        {
          title: "4. 데이터 공유",
          body: "당사는 개인정보를 판매하지 않습니다. 서비스 운영을 지원하는 제공업체 또는 법률상 필요한 경우 제한적인 정보를 공유할 수 있습니다.",
        },
        {
          title: "5. 데이터 보안",
          body: "당사는 합리적인 기술적·관리적 보호 조치를 적용하지만, 전송 또는 저장 방식이 완전히 안전하다고 보장할 수는 없습니다.",
        },
        {
          title: "6. 귀하의 권리",
          body: "관할 법률에 따라 개인정보 접근, 수정, 내보내기 또는 삭제를 요청할 권리가 있을 수 있습니다.",
        },
        {
          title: "7. 아동 개인정보",
          body: "서비스는 13세 미만 아동을 대상으로 하지 않으며, 당사는 아동의 개인정보를 고의로 수집하지 않습니다.",
        },
        {
          title: "8. 변경",
          body: "본 방침은 수시로 업데이트될 수 있으며, 변경 사항은 수정된 날짜와 함께 이 페이지에 게시됩니다.",
        },
      ],
      contact: "본 방침에 대한 문의는 다음으로 연락해 주세요",
    },
    terms: {
      back: "홈으로 돌아가기",
      updated: "마지막 업데이트",
      title: "이용 약관",
      description: "YesNAS 사용에 적용되는 조건입니다.",
      sections: [
        {
          title: "1. 약관 동의",
          body: "YesNAS(“서비스”)를 다운로드, 설치 또는 사용하면 본 이용 약관에 동의하는 것입니다. 동의하지 않는 경우 서비스를 사용하지 마세요.",
        },
        {
          title: "2. 라이선스",
          body: "본 약관을 준수하는 조건으로 개인적, 비상업적 목적의 제한적, 비독점적, 양도 불가, 철회 가능한 라이선스를 부여합니다.",
        },
        {
          title: "3. 허용되는 사용",
          body: "불법 목적 사용, 서비스 무결성 방해, 무단 접근 시도, 법률상 허용되지 않는 리버스 엔지니어링은 금지됩니다.",
        },
        {
          title: "4. 사용자 콘텐츠",
          body: "서비스를 통해 처리하는 파일, 데이터, 콘텐츠의 권리는 사용자에게 있으며, 해당 콘텐츠와 필요한 권리에 대한 책임은 사용자에게 있습니다.",
        },
        {
          title: "5. 지식재산권",
          body: "서비스의 소프트웨어, 디자인, 상표는 당사 또는 라이선스 제공자의 소유이며 법률로 보호됩니다.",
        },
        {
          title: "6. 면책",
          body: "서비스는 어떠한 보증 없이 ‘있는 그대로’ 및 ‘사용 가능한 상태’로 제공됩니다.",
        },
        {
          title: "7. 책임 제한",
          body: "법률이 허용하는 최대 범위에서 당사는 서비스 사용으로 인한 간접, 부수, 특별, 결과적, 징벌적 손해 또는 이익·데이터 손실에 대해 책임지지 않습니다.",
        },
        {
          title: "8. 변경 및 종료",
          body: "당사는 약관을 변경하거나 접근을 중단할 수 있으며, 변경 후 계속 사용하는 것은 수정 약관에 동의한 것으로 간주됩니다.",
        },
      ],
      contact: "본 약관에 대한 문의는 다음으로 연락해 주세요",
    },
  },
  pt: {
    privacy: {
      back: "Voltar ao início",
      updated: "Última atualização",
      title: "Política de Privacidade",
      description: "Como o YesNAS coleta, usa e protege suas informações.",
      sections: [
        {
          title: "1. Introdução",
          body: "Esta Política explica como o YesNAS (“nós”) coleta, usa e compartilha informações quando você utiliza nosso software, site e serviços relacionados.",
        },
        {
          title: "2. Informações coletadas",
          body: "O YesNAS foi projetado para rodar localmente no seu dispositivo. Arquivos, fotos, vídeos, metadados e índices de IA local permanecem no seu hardware. Podemos coletar informações não pessoais limitadas, como estatísticas anônimas, relatórios de falha e dados de versão, para melhorar o produto.",
        },
        {
          title: "3. Uso das informações",
          body: "Usamos informações para operar, manter, proteger e melhorar os Serviços, diagnosticar problemas técnicos e responder ao suporte.",
        },
        {
          title: "4. Compartilhamento",
          body: "Não vendemos suas informações pessoais. Podemos compartilhar informações limitadas com prestadores de serviço ou quando exigido por lei.",
        },
        {
          title: "5. Segurança",
          body: "Aplicamos medidas técnicas e organizacionais razoáveis, mas nenhum método de transmissão ou armazenamento é totalmente seguro.",
        },
        {
          title: "6. Seus direitos",
          body: "Dependendo da sua jurisdição, você pode ter direitos de acessar, corrigir, exportar ou excluir dados pessoais.",
        },
        {
          title: "7. Privacidade infantil",
          body: "Os Serviços não são direcionados a menores de 13 anos e não coletamos conscientemente informações pessoais de crianças.",
        },
        {
          title: "8. Alterações",
          body: "Podemos atualizar esta Política. As alterações serão publicadas nesta página com uma data revisada.",
        },
      ],
      contact: "Se tiver dúvidas sobre esta Política, entre em contato pelo",
    },
    terms: {
      back: "Voltar ao início",
      updated: "Última atualização",
      title: "Termos de Uso",
      description: "Os termos que regem seu uso do YesNAS.",
      sections: [
        {
          title: "1. Aceitação",
          body: "Ao baixar, instalar ou usar o YesNAS (“Serviços”), você concorda com estes Termos de Uso. Se não concordar, não use os Serviços.",
        },
        {
          title: "2. Licença",
          body: "Concedemos uma licença limitada, não exclusiva, intransferível e revogável para usar os Serviços para fins pessoais e não comerciais.",
        },
        {
          title: "3. Uso aceitável",
          body: "Você não deve usar os Serviços para fins ilegais, interferir em sua integridade, tentar acesso não autorizado ou fazer engenharia reversa exceto quando permitido por lei.",
        },
        {
          title: "4. Conteúdo do usuário",
          body: "Você mantém todos os direitos sobre arquivos, dados e conteúdo processados pelos Serviços e é responsável por eles.",
        },
        {
          title: "5. Propriedade intelectual",
          body: "O software, design e marcas dos Serviços pertencem a nós ou a nossos licenciadores e são protegidos por lei.",
        },
        {
          title: "6. Isenções",
          body: "Os Serviços são fornecidos “no estado em que se encontram” e “conforme disponíveis”, sem garantias de qualquer tipo.",
        },
        {
          title: "7. Limitação de responsabilidade",
          body: "Na máxima extensão permitida por lei, não somos responsáveis por danos indiretos, incidentais, especiais, consequenciais ou punitivos, nem por perda de lucros ou dados.",
        },
        {
          title: "8. Alterações e encerramento",
          body: "Podemos alterar estes Termos ou suspender o acesso. O uso contínuo após alterações constitui aceitação.",
        },
      ],
      contact: "Dúvidas sobre estes Termos? Entre em contato pelo",
    },
  },
};

export function getLegalCopy(kind: LegalKind, locale: LocaleCode) {
  return legalCopy[locale]?.[kind] ?? legalCopy.en[kind];
}

export function getLegalHead(kind: LegalKind, locale: LocaleCode) {
  const copy = getLegalCopy(kind, locale);

  return {
    meta: [
      { title: `${copy.title} — YesNAS` },
      { name: "description", content: copy.description },
      { name: "robots", content: "noindex, nofollow" },
    ],
  };
}

export function LegalPage({ kind }: { kind: LegalKind }) {
  const location = useLocation();
  const locale = localeFromPathname(location.pathname);
  const copy = getLegalCopy(kind, locale);
  const formattedDate = new Intl.DateTimeFormat(localeName[locale], {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(`${updatedAt}T00:00:00Z`));

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <Link
          to={localeToPath(locale)}
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
        >
          <ArrowLeft className="size-4" /> {copy.back}
        </Link>
        <h1 className="text-4xl font-semibold tracking-tight">{copy.title}</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          {copy.updated}: {formattedDate}
        </p>

        <div className="prose prose-invert mt-10 max-w-none space-y-6 text-muted-foreground leading-relaxed">
          {copy.sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-xl font-semibold text-foreground">{section.title}</h2>
              <p>{section.body}</p>
            </section>
          ))}
          <section>
            <h2 className="text-xl font-semibold text-foreground">9. {contactTitle[locale]}</h2>
            <p>
              {copy.contact}{" "}
              <a href="mailto:admin@yesnas.com" className="text-brand hover:underline">
                admin@yesnas.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

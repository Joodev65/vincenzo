const k = [
  "https://panelby.cloudrangzz.my.id/ptjastebvinzz/RangzzNS",
  "https://panelfinavip.sendora.my.id/ptjastebvinzz/lukyxyz"
];

export default async function handler(req, res) {
  try {
    const q = req.query;

    if ("data" in q) {
      const results = await Promise.all(
        k.map(async (base) => {
          try {
            const r = await fetch(`${base}/data.php`);
            return await r.json();
          } catch {
            return [];
          }
        })
      );

      return res.status(200).json(results.flat());
    }

    else if ("add" in q) {
      const { email, jumlahResult } = q;

      if (!email || !jumlahResult)
        return res.status(400).json({
          success: false,
          message: "Jjoooozyy"
        });

      await Promise.all(
        k.map(async (base) => {
          const form = new FormData();
          form.append("email", email);
          form.append("jumlahResult", jumlahResult);

          try {
            await fetch(`${base}/add.php`, {
              method: "POST",
              body: form
            });
          } catch {}
        })
      );

      return res.json({
        success: true,
        message: "Berhasil."
      });
    }

    else if ("delete" in q) {
      const { email } = q;

      if (!email)
        return res.status(400).json({
          success: false,
          message: "Jjoooozyy"
        });

      await Promise.all(
        k.map(async (base) => {
          const form = new FormData();
          form.append("email", email);

          try {
            await fetch(`${base}/delete.php`, {
              method: "POST",
              body: form
            });
          } catch {}
        })
      );

      return res.json({
        success: true,
        message: "Berhasil."
      });
    }

    else if ("ganti" in q) {
      const { nick, sender } = q;

      if (!nick || !sender)
        return res.status(400).json({
          success: false,
          message: "Jjoooozyy"
        });

      await Promise.all(
        k.map(async (base) => {
          try {
            await fetch(
              `${base}/ganti.php?nick=${encodeURIComponent(nick)}&sender=${encodeURIComponent(sender)}`
            );
          } catch {}
        })
      );

      return res.json({
        success: true,
        message: "Berhasil."
      });
    }

    return res.status(400).json({
      success: false,
      message: "Jjoooozyy"
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message
    });
  }
}
export default async function handler(req, res) {
  try {
    const q = req.query;
    let response;

    if ("data" in q) {
      response = await fetch(
        "https://panelby.cloudrangzz.my.id/ptjastebvinzz/RangzzNS/data.php"
      );
    }

    else if ("add" in q) {
      const { email, jumlahResult } = q;

      if (!email || !jumlahResult) {
        return res.status(400).json({
          success: false,
          message: "email dan jumlahResult wajib diisi"
        });
      }

      const form = new FormData();
      form.append("email", email);
      form.append("jumlahResult", jumlahResult);

      response = await fetch(
        "https://panelby.cloudrangzz.my.id/ptjastebvinzz/RangzzNS/add.php",
        {
          method: "POST",
          body: form
        }
      );
    }
 
    else if ("delete" in q) {
      const { email } = q;

      if (!email) {
        return res.status(400).json({
          success: false,
          message: "email wajib diisi"
        });
      }

      const form = new FormData();
      form.append("email", email);

      response = await fetch(
        "https://panelby.cloudrangzz.my.id/ptjastebvinzz/RangzzNS/delete.php",
        {
          method: "POST",
          body: form
        }
      );
    }

    else if ("ganti" in q) {
      const { nick, sender } = q;

      if (!nick || !sender) {
        return res.status(400).json({
          success: false,
          message: "nick dan sender wajib diisi"
        });
      }

      response = await fetch(
        `https://panelby.cloudrangzz.my.id/ptjastebvinzz/RangzzNS/ganti.php?nick=${encodeURIComponent(
          nick
        )}&sender=${encodeURIComponent(sender)}`
      );
    }

    else {
      return res.status(400).json({
        success: false,
        message: "Query tidak valid"
      });
    }

    const text = await response.text();

    try {
      const json = JSON.parse(text);
      return res.status(200).json(json);
    } catch {
      return res.status(200).send(text);
    }

  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message
    });
  }
        }
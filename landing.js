/* ===============================
   MAIN.JS – VELVENT (SAFE FINAL)
================================ */

/* 🔗 SUPABASE IMPORT
   Adjust path ONLY if needed
*/
import { supabase } from "./supabase.js";

/* ===============================
   DOM READY
================================ */
document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     FAQ TOGGLE
  ================================ */
  document.querySelectorAll(".faq-header").forEach(header => {
    header.addEventListener("click", () => {
      const item = header.parentElement;
      const isActive = item.classList.contains("active");

      document
        .querySelectorAll(".faq-item")
        .forEach(i => i.classList.remove("active"));

      if (!isActive) {
        item.classList.add("active");
        const icon = header.querySelector(".faq-icon");
        if (icon) icon.textContent = "-";
      } else {
        const icon = header.querySelector(".faq-icon");
        if (icon) icon.textContent = "+";
      }
    });
  });

  /* ===============================
     FADE-IN ON SCROLL
  ================================ */
  const sections = document.querySelectorAll(".section-padding");

  if (sections.length) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          entry.target.style.transform = "translateY(0)";
        }
      });
    }, { threshold: 0.1 });

    sections.forEach(s => {
      s.style.opacity = 0;
      s.style.transform = "translateY(40px)";
      s.style.transition = "1s ease-out";
      observer.observe(s);
    });
  }

  /* ===============================
     CTA BUTTON GLOW
  ================================ */
  const ctaBtn = document.querySelector(".cta-btn");

  if (ctaBtn) {
    ctaBtn.addEventListener("mousemove", e => {
      const rect = ctaBtn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      ctaBtn.style.background = `
        radial-gradient(
          120px circle at ${x}px ${y}px,
          rgba(255,255,255,0.35),
          #2563eb
        )
      `;
    });

    ctaBtn.addEventListener("mouseleave", () => {
      ctaBtn.style.background =
        "linear-gradient(135deg, #2563eb, #1e40af)";
    });
  }

  /* ===============================
     EARLY ACCESS FORM (UI ONLY)
  ================================ */
  const earlyForm = document.querySelector(".early-access-form");

  if (earlyForm) {
    earlyForm.addEventListener("submit", e => {
      e.preventDefault();

      const firstName = document.getElementById("firstName")?.value.trim();
      const lastName = document.getElementById("lastName")?.value.trim();
      const email = document.getElementById("email")?.value.trim();
      const howKnow = document.getElementById("howKnow")?.value;

      if (!firstName || !lastName || !email || !howKnow) {
        alert("Please fill in all required fields.");
        return;
      }

      console.log("Early access:", {
        firstName,
        lastName,
        email,
        howKnow
      });

      alert(`Thank you ${firstName} for joining Velvent!`);

      earlyForm.reset();

      const submitBtn = earlyForm.querySelector(".join-button");
      if (submitBtn) {
        const original = submitBtn.textContent;
        submitBtn.textContent = "Success!";
        submitBtn.style.background =
          "linear-gradient(135deg, #51cf66, #2e8b40)";

        setTimeout(() => {
          submitBtn.textContent = original;
          submitBtn.style.background =
            "linear-gradient(135deg, #3a86ff, #2667cc)";
        }, 2000);
      }
    });
  }

  /* ===============================
     JOIN VELVENT (SUPABASE)
  ================================ */
  const joinForm = document.getElementById("joinVelventForm");

  if (joinForm) {
    const submitBtn = joinForm.querySelector(".velvent-submit-btn");

    joinForm.addEventListener("submit", async e => {
      e.preventDefault();

      submitBtn.disabled = true;
      submitBtn.textContent = "Joining...";

      const data = {
        first_name: document.getElementById("firstName")?.value.trim(),
        last_name: document.getElementById("lastName")?.value.trim(),
        email: document.getElementById("email")?.value.trim(),
        source: document.getElementById("source")?.value
      };

      if (!data.email) {
        alert("Email is required");
        submitBtn.disabled = false;
        submitBtn.textContent = "Join Velvent";
        return;
      }

      try {
        const { error } = await supabase
          .from("early_access_signups")
          .insert([data]);

        if (error) {
          console.error(error);
          alert("Email already registered.");
          submitBtn.disabled = false;
          submitBtn.textContent = "Join Velvent";
          return;
        }

        submitBtn.textContent = "You're in 🚀";
        joinForm.reset();

        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.textContent = "Join Velvent";
        }, 3000);

      } catch (err) {
        console.error(err);
        alert("Something went wrong.");
        submitBtn.disabled = false;
        submitBtn.textContent = "Join Velvent";
      }
    });
  }

});

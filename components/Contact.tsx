import React from 'react';

const Contact: React.FC = () => {
  return (
    <section>
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-[#4A4A4A]">ติดต่อเรา</h2>
        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
          มีคำถามเพิ่มเติมหรือต้องการคำปรึกษาเฉพาะทางสำหรับธุรกิจของคุณ? กรอกแบบฟอร์มด้านล่างเพื่อติดต่อเรา
        </p>
      </div>
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <form action="#" method="POST" className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">ชื่อ-นามสกุล</label>
            <input type="text" name="name" id="name" autoComplete="name" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#D4A373] focus:border-[#D4A373] sm:text-sm bg-[#D4A373]/20 text-gray-800" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">อีเมล</label>
            <input type="email" name="email" id="email" autoComplete="email" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#D4A373] focus:border-[#D4A373] sm:text-sm bg-[#D4A373]/20 text-gray-800" />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">ข้อความ</label>
            <textarea id="message" name="message" rows={4} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#D4A373] focus:border-[#D4A373] sm:text-sm bg-[#D4A373]/20 text-gray-800"></textarea>
          </div>
          <div>
            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#D4A373] hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D4A373]">
              ส่งข้อความ
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;